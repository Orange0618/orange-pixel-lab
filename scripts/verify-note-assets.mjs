import { access, readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const notesDirectory = path.join(workspace, 'public', 'notes')
const assetsDirectory = path.join(workspace, 'public', 'notes-assets')
const totalAssetBudget = 100 * 1024 * 1024
const individualAssetBudget = 1024 * 1024
const remoteImagePattern = /!\[[^\]]*\]\(https?:\/\/[^\s)]+/
const localImagePattern = /!\[[^\]]*\]\((?!https?:\/\/)([^\s)]+)(?:\s+"[^"]*")?\)/g
const remoteHtmlImagePattern = /<img\b[^>]*\bsrc=["']https?:\/\//i
const localHtmlImagePattern = /<img\b[^>]*\bsrc=["'](?!https?:\/\/)([^"']+)["'][^>]*>/gi

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async entry => {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return markdownFiles(entryPath)
    return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : []
  }))
  return files.flat()
}

const files = await markdownFiles(notesDirectory)
let localImageCount = 0
for (const file of files) {
  const markdown = await readFile(file, 'utf8')
  if (remoteImagePattern.test(markdown) || remoteHtmlImagePattern.test(markdown)) {
    throw new Error(`Remote Markdown image remains in ${path.relative(workspace, file)}`)
  }
  for (const match of markdown.matchAll(localImagePattern)) {
    const assetPath = path.resolve(path.dirname(file), match[1])
    await access(assetPath)
    localImageCount += 1
  }
  for (const match of markdown.matchAll(localHtmlImagePattern)) {
    const assetPath = path.resolve(path.dirname(file), match[1])
    await access(assetPath)
    localImageCount += 1
  }
}

const assetEntries = (await readdir(assetsDirectory, { withFileTypes: true })).filter(entry => entry.isFile())
const assetSizes = await Promise.all(assetEntries.map(async entry => ({
  name: entry.name,
  size: (await stat(path.join(assetsDirectory, entry.name))).size
})))
const totalAssetBytes = assetSizes.reduce((total, asset) => total + asset.size, 0)
const largestAsset = assetSizes.reduce((largest, asset) => asset.size > largest.size ? asset : largest, { name: '', size: 0 })

if (totalAssetBytes > totalAssetBudget) {
  throw new Error(`Note images exceed the 100 MB budget: ${(totalAssetBytes / 1024 / 1024).toFixed(2)} MB.`)
}
if (largestAsset.size > individualAssetBudget) {
  throw new Error(`Note image exceeds the 1 MB budget: ${largestAsset.name} (${(largestAsset.size / 1024).toFixed(1)} KB).`)
}

console.log(`Verified ${files.length} notes and ${localImageCount} local image references (${(totalAssetBytes / 1024 / 1024).toFixed(2)} MB).`)
