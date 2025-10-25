const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

const HOMEPAGE = process.env.MSEARCH_URL || 'https://m-search-officiel.base44.app'
// User-Agent branding light
const UA_SUFFIX = ' mEdge/2.0 (Electron)'

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'mEdge 2.0',
    backgroundColor: '#111111',
    trafficLightPosition: { x: 12, y: 12 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: true, // we use a <webview> in the renderer for simplicity
      spellcheck: true
    }
  })

  win.loadFile(path.join(__dirname, 'src', 'index.html'))

  // open external http(s) links in default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url)
      return { action: 'deny' }
    }
    return { action: 'allow' }
  })

  // Small UA tweak
  win.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = (details.requestHeaders['User-Agent'] || '') + UA_SUFFIX
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})