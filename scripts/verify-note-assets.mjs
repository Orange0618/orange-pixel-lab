import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const notesDirectory = path.join(workspace, 'public', 'notes')
const remoteImagePattern = /!\[[^\]]*\]\(https?:\/\/[^\s)]+/
const localImagePattern = /!\[[^\]]*\]\((?!https?:\/\/)([^\s)]+)(?:\s+"[^"]*")?\)/g

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
  if (remoteImagePattern.test(markdown)) throw new Error(`Remote Markdown image remains in ${path.relative(workspace, file)}`)
  for (const match of markdown.matchAll(localImagePattern)) {
    const assetPath = path.resolve(path.dirname(file), match[1])
    await access(assetPath)
    localImageCount += 1
  }
}

console.log(`Verified ${files.length} notes and ${localImageCount} local image references.`)
