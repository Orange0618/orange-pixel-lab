import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceDirectory = path.join(workspace, 'resource', 'note')
const publicDirectory = path.join(workspace, 'public')
const targetDirectory = path.join(publicDirectory, 'notes')
const assetDirectory = path.join(publicDirectory, 'notes-assets')
const manifestFile = path.join(publicDirectory, 'notes-manifest.json')
const imagePattern = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)(\s+"[^"]*")?\)/g
const parallelDownloads = 6

for (const directory of [sourceDirectory, targetDirectory, assetDirectory]) {
  if (!directory.startsWith(workspace)) throw new Error('Notes synchronization path must stay inside the workspace.')
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async entry => {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return markdownFiles(entryPath)
    return entry.isFile() && entry.name.toLowerCase().endsWith('.md') ? [entryPath] : []
  }))
  return files.flat()
}

function stableSlug(value, prefix = 'note') {
  const hash = createHash('sha256').update(value).digest('hex').slice(0, 12)
  return `${prefix}-${hash}`
}

function imageExtension(url, contentType) {
  const fromUrl = path.extname(new URL(url).pathname).toLowerCase()
  if (/^\.(avif|gif|jpe?g|png|svg|webp)$/.test(fromUrl)) return fromUrl === '.jpeg' ? '.jpg' : fromUrl
  const fromContentType = contentType?.split(';')[0]
  return ({ 'image/avif': '.avif', 'image/gif': '.gif', 'image/jpeg': '.jpg', 'image/png': '.png', 'image/svg+xml': '.svg', 'image/webp': '.webp' })[fromContentType] ?? '.img'
}

async function fetchImage(url, attempt = 1) {
  try {
    const response = await fetch(url, { headers: { 'user-agent': 'Orange-Pixel-Lab-Note-Sync/1.0' } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const bytes = new Uint8Array(await response.arrayBuffer())
    if (!bytes.length) throw new Error('empty response')
    return { bytes, contentType: response.headers.get('content-type') }
  } catch (error) {
    if (attempt >= 3) throw new Error(`${url}: ${error.message}`)
    await new Promise(resolve => setTimeout(resolve, attempt * 400))
    return fetchImage(url, attempt + 1)
  }
}

async function optimizeImage(bytes) {
  const { data, info } = await sharp(bytes)
    .rotate()
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 90, effort: 4, smartSubsample: true })
    .toBuffer({ resolveWithObject: true })
  return { bytes: new Uint8Array(data), width: info.width, height: info.height }
}

function escapeHtmlAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length)
  let cursor = 0
  async function runWorker() {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await worker(items[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, runWorker))
  return results
}

function titleFrom(relativePath) {
  return path.basename(relativePath, '.md')
}

const files = (await markdownFiles(sourceDirectory)).sort((left, right) => left.localeCompare(right, 'zh-CN'))
await rm(targetDirectory, { recursive: true, force: true })
await rm(assetDirectory, { recursive: true, force: true })
await mkdir(publicDirectory, { recursive: true })
await cp(sourceDirectory, targetDirectory, { recursive: true })
await mkdir(assetDirectory, { recursive: true })

const outputFiles = (await markdownFiles(targetDirectory)).sort((left, right) => left.localeCompare(right, 'zh-CN'))
const markdownByFile = await Promise.all(outputFiles.map(async file => ({ file, markdown: await readFile(file, 'utf8') })))
const remoteUrls = [...new Set(markdownByFile.flatMap(({ markdown }) => [...markdown.matchAll(imagePattern)].map(match => match[2])))]
const localAssets = new Map()

console.log(`Mirroring ${remoteUrls.length} Markdown images locally...`)
await mapWithConcurrency(remoteUrls, parallelDownloads, async (url, index) => {
  const { bytes, contentType } = await fetchImage(url)
  const sourceExtension = imageExtension(url, contentType)
  const canOptimize = /^\.(avif|jpe?g|png|webp)$/.test(sourceExtension)
  const optimized = canOptimize ? await optimizeImage(bytes) : null
  const metadata = optimized ? null : await sharp(bytes, { animated: true }).metadata()
  const outputBytes = optimized?.bytes ?? bytes
  const assetName = `${stableSlug(url, 'image')}${canOptimize ? '.webp' : sourceExtension}`
  const assetFile = path.join(assetDirectory, assetName)
  await writeFile(assetFile, outputBytes)
  localAssets.set(url, {
    assetFile,
    width: optimized?.width ?? metadata.width,
    height: optimized?.height ?? metadata.height
  })
  if ((index + 1) % 50 === 0 || index + 1 === remoteUrls.length) console.log(`  mirrored ${index + 1}/${remoteUrls.length}`)
})

await Promise.all(markdownByFile.map(async ({ file, markdown }) => {
  const rewritten = markdown.replace(imagePattern, (fullMatch, alt, url, title = '') => {
    const asset = localAssets.get(url)
    if (!asset) throw new Error(`No local asset generated for ${url}`)
    const { assetFile, width, height } = asset
    const localPath = path.relative(path.dirname(file), assetFile).split(path.sep).join('/')
    const titleAttribute = title ? ` title="${escapeHtmlAttribute(title.slice(2, -1))}"` : ''
    return `<img src="${localPath}" alt="${escapeHtmlAttribute(alt)}" width="${width}" height="${height}"${titleAttribute}>`
  })
  await writeFile(file, rewritten, 'utf8')
}))

const manifest = await Promise.all(files.map(async file => {
  const relativePath = path.relative(sourceDirectory, file).split(path.sep).join('/')
  const categoryPath = path.dirname(relativePath) === '.' ? [] : path.dirname(relativePath).split(path.sep)
  const directory = categoryPath.join(' / ')
  const details = await stat(file)
  const title = titleFrom(relativePath)
  return {
    slug: stableSlug(relativePath),
    title,
    category: directory || '技术笔记',
    categoryPath,
    description: `${title} · 来自 Orange 的技术学习笔记。`,
    file: `notes/${relativePath}`,
    updatedAt: details.mtime.toISOString()
  }
}))

manifest.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
if (manifest[0]) manifest[0].featured = true
await writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(`Synchronized ${manifest.length} Markdown notes and ${localAssets.size} local images.`)
