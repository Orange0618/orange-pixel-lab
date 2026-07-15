import { marked } from 'marked'
import DOMPurify from 'dompurify'

const baseUrl = import.meta.env.BASE_URL
const notesGrid = document.querySelector('#notes-grid')
const reader = document.querySelector('#note-reader')
const readerTitle = document.querySelector('#reader-title')
const readerCategory = document.querySelector('#reader-category')
const readerSummary = document.querySelector('#reader-summary')
const readerContent = document.querySelector('#reader-content')
const readerSource = document.querySelector('#reader-source')
const readerToc = document.querySelector('#reader-toc')
const readerTocLinks = document.querySelector('#reader-toc-links')
const directory = document.querySelector('#notes-directory')
const directoryBack = document.querySelector('#directory-back')
const directoryPath = document.querySelector('#directory-path')
const directoryTitle = document.querySelector('#directory-title')
const directorySummary = document.querySelector('#directory-summary')
const directoryContent = document.querySelector('#directory-content')
const navLinks = document.querySelectorAll('.primary-nav a')
const homeSections = [...document.querySelectorAll('main > section:not(.note-reader):not(.notes-directory)[id]')]
let notes = []
let tocHeadings = []

const html = value => DOMPurify.sanitize(value, { ALLOWED_TAGS: [] })
const samePath = (left, right) => left.length === right.length && left.every((part, index) => part === right[index])
const startsWithPath = (whole, prefix) => prefix.every((part, index) => whole[index] === part)
const encodedPath = parts => parts.map(encodeURIComponent).join('/')
const pathFromHash = value => value ? value.split('/').filter(Boolean).map(decodeURIComponent) : []

function categoryCard(parts, index) {
  const count = notes.filter(note => startsWithPath(note.categoryPath, parts)).length
  const label = parts.at(-1)
  return `
    <a class="category-card" href="#notes/${encodedPath(parts)}">
      <span class="category-card-label">DIR / ${String(index + 1).padStart(2, '0')}</span>
      <h3>${html(label)}</h3>
      <span class="category-card-count">${String(count).padStart(2, '0')} NOTES</span>
      <span class="category-card-arrow">→</span>
    </a>`
}

function noteListItem(note, path) {
  return `
    <a class="directory-note" href="#note/${note.slug}">
      <p>${html(path.join(' / ').toUpperCase())} / MD</p>
      <h3>${html(note.title)}</h3>
      <span>→</span>
    </a>`
}

function childDirectories(path) {
  const result = new Map()
  notes.forEach(note => {
    if (!startsWithPath(note.categoryPath, path) || note.categoryPath.length <= path.length) return
    const child = note.categoryPath.slice(0, path.length + 1)
    result.set(child.join('\u0000'), child)
  })
  return [...result.values()].sort((left, right) => left.at(-1).localeCompare(right.at(-1), 'zh-CN'))
}

function renderCatalog() {
  if (!notesGrid) return
  const rootDirectories = childDirectories([])
  if (!rootDirectories.length) {
    notesGrid.innerHTML = '<p class="notes-empty">NO_NOTE_DIRECTORIES_FOUND</p>'
    return
  }
  notesGrid.classList.add('category-grid')
  notesGrid.innerHTML = rootDirectories.map(categoryCard).join('')
}

function renderDirectory(path) {
  const directNotes = notes.filter(note => samePath(note.categoryPath, path))
  const directories = childDirectories(path)
  directoryPath.textContent = `NOTES / ${path.join(' / ').toUpperCase()}`
  directoryTitle.textContent = path.at(-1) ?? '笔记目录'
  directorySummary.textContent = `当前目录包含 ${directNotes.length} 篇 Markdown 笔记${directories.length ? ` 与 ${directories.length} 个子目录` : ''}。`
  directoryBack.href = path.length > 1 ? `#notes/${encodedPath(path.slice(0, -1))}` : '#notes'

  const groups = []
  if (directories.length) groups.push(`<div class="category-grid">${directories.map(categoryCard).join('')}</div>`)
  if (directNotes.length) groups.push(`<div class="directory-note-list">${directNotes.map(note => noteListItem(note, path)).join('')}</div>`)
  directoryContent.innerHTML = groups.join('') || '<p class="notes-empty">EMPTY_DIRECTORY</p>'
}

function markdownToHtml(markdown) {
  const rawHtml = marked.parse(markdown, { gfm: true, breaks: true })
  return DOMPurify.sanitize(rawHtml, { USE_PROFILES: { html: true } })
}

function noteUrl(note) {
  return `${baseUrl}${note.file.split('/').map(encodeURIComponent).join('/')}`
}

function addHeadingAnchors() {
  readerContent.querySelectorAll('h1, h2, h3, h4').forEach((heading, index) => {
    heading.id = `section-${index + 1}`
  })
}

function updateTocActive() {
  if (!document.body.classList.contains('reading-mode') || !tocHeadings.length) return
  let current = tocHeadings[0]
  tocHeadings.forEach(heading => {
    if (heading.getBoundingClientRect().top <= 138) current = heading
  })
  readerTocLinks.querySelectorAll('a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`)
  })
}

function buildTableOfContents() {
  tocHeadings = [...readerContent.querySelectorAll('h2, h3, h4')]
  if (!tocHeadings.length) {
    readerToc.hidden = true
    readerTocLinks.innerHTML = ''
    return
  }
  readerTocLinks.innerHTML = tocHeadings.map(heading => `
    <a class="toc-link toc-level-${heading.tagName.slice(1)}" href="#${heading.id}">${html(heading.textContent)}</a>`).join('')
  readerToc.hidden = false
  requestAnimationFrame(updateTocActive)
}

function makeRelativeLinksWork(note) {
  const sourceUrl = new URL(noteUrl(note), window.location.origin)
  readerContent.querySelectorAll('img[src], a[href]').forEach(element => {
    const attribute = element.tagName === 'IMG' ? 'src' : 'href'
    const value = element.getAttribute(attribute)
    if (!value || /^(#|https?:|mailto:|tel:|data:)/i.test(value)) return
    element.setAttribute(attribute, new URL(value, sourceUrl).href)
  })
}

async function openNote(note) {
  document.body.classList.remove('directory-mode')
  directory.hidden = true
  document.body.classList.add('reading-mode')
  reader.hidden = false
  readerTitle.textContent = note.title
  readerCategory.textContent = note.category
  readerSummary.textContent = note.description
  readerContent.innerHTML = '<p class="reader-loading">LOADING_NOTE...</p>'
  readerToc.hidden = true
  readerTocLinks.innerHTML = ''
  tocHeadings = []
  readerSource.href = noteUrl(note)
  document.title = `${note.title} | Orange Pixel Lab`
  window.scrollTo({ top: 0, behavior: 'instant' })

  try {
    const response = await fetch(noteUrl(note))
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    readerContent.innerHTML = markdownToHtml(await response.text())
    addHeadingAnchors()
    makeRelativeLinksWork(note)
    buildTableOfContents()
  } catch (error) {
    readerContent.innerHTML = `<div class="reader-error"><strong>NOTE_LOAD_ERROR</strong><p>暂时无法读取这篇 Markdown 笔记。</p><a href="${noteUrl(note)}" target="_blank" rel="noreferrer">打开 Markdown 源文件 →</a></div>`
  }
}

function openDirectory(path) {
  if (!path.length || !notes.some(note => startsWithPath(note.categoryPath, path))) return false
  document.body.classList.remove('reading-mode')
  reader.hidden = true
  document.body.classList.add('directory-mode')
  directory.hidden = false
  renderDirectory(path)
  document.title = `${path.at(-1)} | Orange Pixel Lab`
  window.scrollTo({ top: 0, behavior: 'instant' })
  return true
}

function closeSpecialViews() {
  document.body.classList.remove('reading-mode', 'directory-mode')
  reader.hidden = true
  readerToc.hidden = true
  tocHeadings = []
  directory.hidden = true
  document.title = 'Orange | Pixel Lab'
}

function handleRoute() {
  const noteMatch = window.location.hash.match(/^#note\/([\w-]+)$/)
  const note = noteMatch && notes.find(item => item.slug === noteMatch[1])
  if (note) {
    openNote(note)
    return
  }

  const directoryMatch = window.location.hash.match(/^#notes(?:\/(.*))?$/)
  if (directoryMatch?.[1] && openDirectory(pathFromHash(directoryMatch[1]))) return
  closeSpecialViews()
}

const sectionObserver = new IntersectionObserver(
  entries => {
    if (document.body.classList.contains('reading-mode') || document.body.classList.contains('directory-mode')) return
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (!visible) return
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`))
  },
  { rootMargin: '-35% 0px -55%', threshold: [0, .2, .5] }
)

async function initialiseNotes() {
  try {
    const response = await fetch(`${baseUrl}notes-manifest.json`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    notes = await response.json()
    notes = notes.map(note => ({ ...note, categoryPath: Array.isArray(note.categoryPath) ? note.categoryPath : note.category.split(' / ') }))
    renderCatalog()
    handleRoute()
  } catch (error) {
    if (notesGrid) notesGrid.innerHTML = '<p class="notes-empty">NOTES_MANIFEST_MISSING</p>'
  }
}

homeSections.forEach(section => sectionObserver.observe(section))
window.addEventListener('hashchange', handleRoute)
window.addEventListener('scroll', updateTocActive, { passive: true })
readerTocLinks.addEventListener('click', event => {
  const link = event.target.closest('.toc-link')
  if (!link) return
  event.preventDefault()
  document.getElementById(link.getAttribute('href').slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})
initialiseNotes()
