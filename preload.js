const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mbridge', {
  go: (url) => ipcRenderer.send('webview:go', url),
  back: () => ipcRenderer.send('webview:back'),
  forward: () => ipcRenderer.send('webview:forward'),
  reload: () => ipcRenderer.send('webview:reload')
})

// We don't actually use IPC for navigation here because we control <webview> from renderer.
// This file is kept for future secure extensions.