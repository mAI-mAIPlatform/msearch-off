const view = document.getElementById('view')
const backBtn = document.getElementById('back')
const fwdBtn = document.getElementById('forward')
const reloadBtn = document.getElementById('reload')
const homeBtn = document.getElementById('home')
const newTabBtn = document.getElementById('newtab')
const omniForm = document.getElementById('omnibox-form')
const omnibox = document.getElementById('omnibox')

const MSEARCH = 'https://m-search-officiel.base44.app'
const isURL = (txt) => /^(https?:\/\/)|(^[a-z0-9\-]+\.[a-z]{2,})/i.test(txt)

omniForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const q = omnibox.value.trim()
  if (!q) return
  const target = isURL(q) ? (q.startsWith('http') ? q : 'https://' + q) :
    `${MSEARCH}/search?q=${encodeURIComponent(q)}`
  view.loadURL(target)
})

backBtn.addEventListener('click', () => view.canGoBack() && view.goBack())
fwdBtn.addEventListener('click', () => view.canGoForward() && view.goForward())
reloadBtn.addEventListener('click', () => view.reload())
homeBtn.addEventListener('click', () => view.loadURL(MSEARCH))
newTabBtn.addEventListener('click', () => view.loadURL(MSEARCH))

view.addEventListener('did-start-loading', () => {
  document.title = 'Chargement… — mEdge 2.0'
})
view.addEventListener('did-stop-loading', async () => {
  const url = await view.getURL()
  omnibox.value = url
  document.title = (await view.getTitle()) + ' — mEdge 2.0'
})

// Shortcuts
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
    omnibox.select(); e.preventDefault()
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
    view.reload(); e.preventDefault()
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 't') {
    view.loadURL(MSEARCH); e.preventDefault()
  }
})