import { marked } from 'marked'
import DOMPurify from 'dompurify'

const ACCESS_CODE = '266502'
const ACCESS_STORAGE_KEY = 'orange-pixel-lab-access-granted'
const accessGate = document.querySelector('#access-gate')
const accessForm = document.querySelector('#access-form')
const accessPassword = document.querySelector('#access-password')
const accessMessage = document.querySelector('#access-message')
const languageToggle = document.querySelector('#language-toggle')
const themeToggle = document.querySelector('#theme-toggle')
const themeToggleIcon = document.querySelector('.theme-toggle-icon')
const themeToggleLabel = document.querySelector('.theme-toggle-label')

const copy = {
  zh: {
    navHome: '首页', navAbout: '关于我', navNotes: '笔记', navProjects: '项目', navContact: '联系我',
    gateCopy: '输入准入密码，进入 Orange 的个人数字实验室。', gateLabel: '准入密码', gateEnter: '进入 ↗', gateFootnote: '仅限获准访问者 / 2026',
    accessDenied: 'ACCESS DENIED. 请检查密码后重试。',
    heroEyebrow: '个人数字实验室 / 2026', heroIntro: '啥都学点，啥都不精的业余计算机练习生。', readNotes: '阅读技术笔记 ↗', browseProjects: '浏览项目 ↗',
    topicSoftware: '软件开发', topicEmbedded: '嵌入式系统', topicIot: '物联网',
    terminalAnswer: 'ORANGE · 王茂林', terminalFocus: 'focus --current', terminalOne: 'AI 原生软件开发', terminalTwo: 'STM32 与连接设备', terminalThree: '公开学习与记录', status: '当前探索中', statusValue: '构建 · 学习 · 分享',
    about: '一个持续生长的<br />技术工作台。', degreeUestc: '计算机技术 · 硕士研究生（预计入学）', degreeNjupt: '软件工程 · 本科',
    skillAi: 'AI 辅助开发', skillEmbedded: '嵌入式开发', skillSystem: '系统开发',
    notes: '把学习过程<br />认真地写下来。', allNotes: '查看全部笔记 ↗',
    directoryTitle: '笔记目录', directoryDefault: '按目录浏览 Orange 的技术笔记。', allCategories: '← 全部分类', allNotesBack: '← 全部笔记', source: '查看 Markdown 源文件 ↗', outline: '文章大纲',
    projects: '把想法做成<br />可以被使用的作品。',
    selfLearning: '自助学习社区', selfLearningDesc: '面向课程讨论、问答、学习资源与分角色管理的 Vue 前端。',
    teachDesc: '让 AI 在实现代码的同时解释思路的教学型 Skill。', markDesc: '将 B 站课程视频整理为可阅读 Markdown 笔记的 Agent Skill。', diaryDesc: '本地优先、注重隐私与轻量记录体验的 Flutter 日记应用。', passwordDesc: '支持系统验证与安全存储的本地 Android 密码管理工具。', snakeDesc: '南京邮电大学 Flutter 课程实验：经典贪吃蛇小游戏。', pythonDesc: '线性回归、逻辑回归、KNN 与 KMeans 的 Python 算法练习。',
    contactTitle: '有想法？<br /><em>我们聊聊。</em>', contactCopy: '欢迎交流软件开发、AI 辅助编程、嵌入式系统与物联网相关话题。',
    notesUnit: '篇笔记', itemsUnit: '项', directorySummary: '当前目录包含 {notes} 篇 Markdown 笔记{directories}。', childDirectories: '，以及 {count} 个子目录', loadingNote: '正在加载笔记...', noteError: '暂时无法读取这篇 Markdown 笔记。', openSource: '打开 Markdown 源文件 ↗', emptyDirectory: '此目录暂时为空。', missingNotes: '未找到笔记目录。', missingManifest: '笔记索引暂不可用。', themeToDark: '切换为深色模式', themeToLight: '切换为浅色模式', languageToEnglish: '切换为英文', languageToChinese: '切换为中文'
  },
  en: {
    navHome: 'Home', navAbout: 'About', navNotes: 'Notes', navProjects: 'Projects', navContact: 'Contact',
    gateCopy: "Enter the access code to open Orange's personal digital lab.", gateLabel: 'ACCESS CODE', gateEnter: 'ENTER ↗', gateFootnote: 'AUTHORIZED VISITORS ONLY / 2026',
    accessDenied: 'ACCESS DENIED. Check the code and try again.',
    heroEyebrow: 'PERSONAL DIGITAL LAB / 2026', heroIntro: 'A hobbyist computer learner: learning a little of everything, mastering none of it yet.', readNotes: 'READ NOTES ↗', browseProjects: 'VIEW PROJECTS ↗',
    topicSoftware: 'Software Development', topicEmbedded: 'Embedded Systems', topicIot: 'Internet of Things',
    terminalAnswer: 'ORANGE · Wang Maolin', terminalFocus: 'focus --current', terminalOne: 'AI-native software making', terminalTwo: 'STM32 & connected devices', terminalThree: 'learning in public', status: 'CURRENTLY EXPLORING', statusValue: 'Build · Learn · Share',
    about: 'A technical workbench<br />that keeps growing.', degreeUestc: 'Computer Technology · MEng Candidate', degreeNjupt: 'Software Engineering · BEng',
    skillAi: 'AI-assisted development', skillEmbedded: 'Embedded development', skillSystem: 'System development',
    notes: 'Write the learning process<br />down with care.', allNotes: 'VIEW ALL NOTES ↗',
    directoryTitle: 'Notes Directory', directoryDefault: "Browse Orange's technical notes by directory.", allCategories: '← ALL CATEGORIES', allNotesBack: '← ALL NOTES', source: 'VIEW MARKDOWN SOURCE ↗', outline: 'OUTLINE',
    projects: 'Turn ideas into<br />things people can use.',
    selfLearning: 'Self-Help Learning Community', selfLearningDesc: 'A Vue frontend for course discussions, Q&A, learning resources, and role-based management.',
    teachDesc: 'A teaching Skill that asks AI to explain its thinking while it implements code.', markDesc: 'An Agent Skill that turns Bilibili course videos into readable Markdown notes.', diaryDesc: 'A local-first Flutter diary focused on privacy and lightweight journaling.', passwordDesc: 'A local Android password manager with system authentication and secure storage.', snakeDesc: 'A classic Snake game built as an NJUPT Flutter course project.', pythonDesc: 'Python exercises for linear and logistic regression, KNN, and KMeans.',
    contactTitle: 'Have an idea?<br /><em>Let’s talk.</em>', contactCopy: 'I welcome conversations about software development, AI-assisted coding, embedded systems, and IoT.',
    notesUnit: 'notes', itemsUnit: 'items', directorySummary: 'This directory contains {notes} Markdown notes{directories}.', childDirectories: ' and {count} subdirectories', loadingNote: 'LOADING NOTE...', noteError: 'This Markdown note is temporarily unavailable.', openSource: 'OPEN MARKDOWN SOURCE ↗', emptyDirectory: 'THIS DIRECTORY IS EMPTY.', missingNotes: 'NO NOTE DIRECTORIES FOUND.', missingManifest: 'NOTES MANIFEST IS UNAVAILABLE.', themeToDark: 'Switch to dark mode', themeToLight: 'Switch to light mode', languageToEnglish: 'Switch to English', languageToChinese: '切换为中文'
  }
}

let currentLanguage = localStorage.getItem('orange-pixel-lab-language') === 'en' ? 'en' : 'zh'
const t = (key, values = {}) => Object.entries(values).reduce((text, [name, value]) => text.replace(`{${name}}`, value), copy[currentLanguage][key] ?? key)
const setText = (selector, value) => {
  const element = document.querySelector(selector)
  if (element) element.textContent = value
}
const setHtml = (selector, value) => {
  const element = document.querySelector(selector)
  if (element) element.innerHTML = value
}

function unlockSite() {
  sessionStorage.setItem(ACCESS_STORAGE_KEY, 'true')
  document.body.classList.remove('access-locked')
  accessGate?.setAttribute('aria-hidden', 'true')
  window.setTimeout(() => accessGate?.setAttribute('hidden', ''), 180)
}

if (sessionStorage.getItem(ACCESS_STORAGE_KEY) === 'true') {
  unlockSite()
} else {
  window.setTimeout(() => accessPassword?.focus(), 80)
}

accessForm?.addEventListener('submit', event => {
  event.preventDefault()
  const isCorrect = accessPassword?.value === ACCESS_CODE

  if (isCorrect) {
    accessMessage.textContent = 'ACCESS GRANTED. LOADING LAB...'
    accessMessage.classList.remove('is-error')
    accessMessage.classList.add('is-success')
    window.setTimeout(unlockSite, 260)
    return
  }

  accessMessage.textContent = t('accessDenied')
  accessMessage.classList.remove('is-success')
  accessMessage.classList.add('is-error')
  accessForm.classList.remove('is-invalid')
  void accessForm.offsetWidth
  accessForm.classList.add('is-invalid')
  accessPassword?.focus()
  accessPassword?.select()
})

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
const readerTocDetails = document.querySelector('#reader-toc-details')
const readerTocCount = document.querySelector('#reader-toc-count')
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
const compactReaderQuery = window.matchMedia('(max-width: 1100px)')

const html = value => DOMPurify.sanitize(value, { ALLOWED_TAGS: [] })
const samePath = (left, right) => left.length === right.length && left.every((part, index) => part === right[index])
const startsWithPath = (whole, prefix) => prefix.every((part, index) => whole[index] === part)
const encodedPath = parts => parts.map(encodeURIComponent).join('/')
const pathFromHash = value => value ? value.split('/').filter(Boolean).map(decodeURIComponent) : []

let currentTheme = localStorage.getItem('orange-pixel-lab-theme') === 'dark' ? 'dark' : 'light'

function applyTheme(theme) {
  currentTheme = theme
  document.body.classList.toggle('dark-mode', theme === 'dark')
  localStorage.setItem('orange-pixel-lab-theme', theme)
  if (!themeToggle) return
  const isDark = theme === 'dark'
  themeToggleIcon.textContent = isDark ? '☼' : '☾'
  themeToggleLabel.textContent = isDark ? 'LIGHT' : 'DARK'
  themeToggle.setAttribute('aria-label', isDark ? t('themeToLight') : t('themeToDark'))
  themeToggle.setAttribute('title', themeToggle.getAttribute('aria-label'))
}

function applyLanguage(language) {
  currentLanguage = language
  localStorage.setItem('orange-pixel-lab-language', language)
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN'
  document.body.classList.toggle('language-en', language === 'en')

  const nav = document.querySelectorAll('.primary-nav a')
  ;['navHome', 'navAbout', 'navNotes', 'navProjects', 'navContact'].forEach((key, index) => {
    if (nav[index]) nav[index].textContent = t(key)
  })
  setHtml('.hero .eyebrow', `<span></span> ${t('heroEyebrow')}`)
  setHtml('.hero-intro', t('heroIntro'))
  const heroActions = document.querySelectorAll('.hero-actions a')
  if (heroActions[0]) heroActions[0].textContent = t('readNotes')
  if (heroActions[1]) heroActions[1].textContent = t('browseProjects')
  const topics = document.querySelectorAll('.topic-row span')
  if (topics[0]) topics[0].textContent = t('topicSoftware')
  if (topics[2]) topics[2].textContent = t('topicEmbedded')
  if (topics[3]) topics[3].textContent = t('topicIot')
  setText('.terminal-answer', t('terminalAnswer'))
  setText('.terminal-content > p:nth-of-type(3)', `$ ${t('terminalFocus')}`)
  const terminalItems = document.querySelectorAll('.terminal-content li')
  ;['terminalOne', 'terminalTwo', 'terminalThree'].forEach((key, index) => {
    const item = terminalItems[index]
    if (item) item.innerHTML = `<b>${String(index + 1).padStart(2, '0')}</b> ${t(key)}`
  })
  setText('.status-card small', t('status'))
  setText('.status-card strong', t('statusValue'))

  setHtml('#about .section-heading h2', t('about'))
  const educationRows = document.querySelectorAll('.timeline li')
  if (educationRows[0]) {
    setText('.timeline li:nth-child(1) strong', language === 'en' ? 'University of Electronic Science and Technology of China' : '电子科技大学')
    setText('.timeline li:nth-child(1) > div > span', t('degreeUestc'))
  }
  if (educationRows[1]) {
    setText('.timeline li:nth-child(2) strong', language === 'en' ? 'Nanjing University of Posts and Telecommunications' : '南京邮电大学')
    setText('.timeline li:nth-child(2) > div > span', t('degreeNjupt'))
  }
  const skillLabels = document.querySelectorAll('.skills-card .skill-group small')
  ;['skillAi', 'skillEmbedded', 'skillSystem'].forEach((key, index) => {
    if (skillLabels[index]) skillLabels[index].textContent = t(key)
  })

  setHtml('#notes .section-heading h2', t('notes'))
  setText('#notes .text-link', t('allNotes'))
  setText('#directory-back', t('allCategories'))
  document.querySelectorAll('.note-reader > .reader-shell > .reader-back').forEach(link => { link.textContent = t('allNotesBack') })
  setText('#reader-source', t('source'))
  setText('.toc-label', t('outline'))
  setText('#directory-title', t('directoryTitle'))
  setText('#directory-summary', t('directoryDefault'))
  setText('#reader-title', language === 'en' ? 'Loading note...' : '正在加载笔记…')
  setText('#reader-summary', language === 'en' ? 'Reading Markdown from the personal notes library.' : '从个人笔记库读取 Markdown 内容。')
  document.querySelector('#reader-toc')?.setAttribute('aria-label', t('outline'))
  document.querySelector('#reader-toc-links')?.setAttribute('aria-label', t('outline'))

  setHtml('#projects .section-heading h2', t('projects'))
  const projectTitles = document.querySelectorAll('.project-info h3')
  if (projectTitles[0]) projectTitles[0].textContent = t('selfLearning')
  const projectDescriptions = document.querySelectorAll('.project-info > span')
  ;['selfLearningDesc', 'teachDesc', 'markDesc', 'diaryDesc', 'passwordDesc', 'snakeDesc', 'pythonDesc'].forEach((key, index) => {
    if (projectDescriptions[index]) projectDescriptions[index].textContent = t(key)
  })

  setHtml('#contact h2', t('contactTitle'))
  setText('.contact-inner > p:not(.eyebrow)', t('contactCopy'))
  setText('.access-copy', t('gateCopy'))
  setText('.access-form label', t('gateLabel'))
  setText('.access-form button', t('gateEnter'))
  setText('.access-footnote', t('gateFootnote'))
  accessPassword?.setAttribute('aria-label', t('gateLabel'))

  languageToggle?.setAttribute('data-language', language)
  languageToggle?.setAttribute('aria-label', language === 'en' ? t('languageToChinese') : t('languageToEnglish'))
  languageToggle?.setAttribute('title', languageToggle.getAttribute('aria-label'))
  applyTheme(currentTheme)

  if (notes.length) {
    renderCatalog()
    const directoryMatch = window.location.hash.match(/^#notes(?:\/(.*))?$/)
    if (document.body.classList.contains('directory-mode') && directoryMatch?.[1]) renderDirectory(pathFromHash(directoryMatch[1]))
  }
}

function categoryCard(parts, index) {
  const count = notes.filter(note => startsWithPath(note.categoryPath, parts)).length
  const label = parts.at(-1)
  return `
    <a class="category-card" href="#notes/${encodedPath(parts)}">
      <span class="category-card-label">DIR / ${String(index + 1).padStart(2, '0')}</span>
      <h3>${html(label)}</h3>
      <span class="category-card-count">${String(count).padStart(2, '0')} ${t('notesUnit').toUpperCase()}</span>
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
  return [...result.values()].sort((left, right) => left.at(-1).localeCompare(right.at(-1), currentLanguage === 'en' ? 'en' : 'zh-CN'))
}

function renderCatalog() {
  if (!notesGrid) return
  const rootDirectories = childDirectories([])
  if (!rootDirectories.length) {
    notesGrid.innerHTML = `<p class="notes-empty">${t('missingNotes')}</p>`
    return
  }
  notesGrid.classList.add('category-grid')
  notesGrid.innerHTML = rootDirectories.map(categoryCard).join('')
}

function renderDirectory(path) {
  const directNotes = notes.filter(note => samePath(note.categoryPath, path))
  const directories = childDirectories(path)
  directoryPath.textContent = `NOTES / ${path.join(' / ').toUpperCase()}`
  directoryTitle.textContent = path.at(-1) ?? t('directoryTitle')
  directorySummary.textContent = t('directorySummary', {
    notes: directNotes.length,
    directories: directories.length ? t('childDirectories', { count: directories.length }) : ''
  })
  directoryBack.href = path.length > 1 ? `#notes/${encodedPath(path.slice(0, -1))}` : '#notes'

  const groups = []
  if (directories.length) groups.push(`<div class="category-grid">${directories.map(categoryCard).join('')}</div>`)
  if (directNotes.length) groups.push(`<div class="directory-note-list">${directNotes.map(note => noteListItem(note, path)).join('')}</div>`)
  directoryContent.innerHTML = groups.join('') || `<p class="notes-empty">${t('emptyDirectory')}</p>`
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

function syncTocPresentation() {
  if (!readerTocDetails || readerToc.hidden) return
  readerTocDetails.open = !compactReaderQuery.matches
}

function buildTableOfContents() {
  tocHeadings = [...readerContent.querySelectorAll('h2, h3, h4')]
  if (!tocHeadings.length) {
    readerToc.hidden = true
    readerTocLinks.innerHTML = ''
    readerTocCount.textContent = ''
    return
  }
  readerTocLinks.innerHTML = tocHeadings.map(heading => `
    <a class="toc-link toc-level-${heading.tagName.slice(1)}" href="#${heading.id}">${html(heading.textContent)}</a>`).join('')
  readerToc.hidden = false
  readerTocCount.textContent = `${String(tocHeadings.length).padStart(2, '0')} ${t('itemsUnit').toUpperCase()}`
  syncTocPresentation()
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
  readerContent.innerHTML = `<p class="reader-loading">${t('loadingNote')}</p>`
  readerToc.hidden = true
  readerTocLinks.innerHTML = ''
  readerTocCount.textContent = ''
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
    readerContent.innerHTML = `<div class="reader-error"><strong>NOTE_LOAD_ERROR</strong><p>${t('noteError')}</p><a href="${noteUrl(note)}" target="_blank" rel="noreferrer">${t('openSource')}</a></div>`
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
  readerTocCount.textContent = ''
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
    if (notesGrid) notesGrid.innerHTML = `<p class="notes-empty">${t('missingManifest')}</p>`
  }
}

homeSections.forEach(section => sectionObserver.observe(section))
window.addEventListener('hashchange', handleRoute)
window.addEventListener('scroll', updateTocActive, { passive: true })
compactReaderQuery.addEventListener('change', syncTocPresentation)
themeToggle?.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'))
languageToggle?.addEventListener('click', () => applyLanguage(currentLanguage === 'zh' ? 'en' : 'zh'))
readerTocLinks.addEventListener('click', event => {
  const link = event.target.closest('.toc-link')
  if (!link) return
  event.preventDefault()
  document.getElementById(link.getAttribute('href').slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (compactReaderQuery.matches) readerTocDetails.open = false
})
applyTheme(currentTheme)
applyLanguage(currentLanguage)
initialiseNotes()
