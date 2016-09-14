const { app, Menu, Tray, globalShortcut } = require('electron')
const path = require('path')
const { getTemplate, updateWP } = require('./controllers/wallpaper')

let tray = null

function createTrap () {
  tray = new Tray(path.join(__dirname, 'resources', 'icon', 'icon.png'))
  const contextMenu = Menu.buildFromTemplate(getTemplate(tray))
  tray.setToolTip('cora')
  tray.setContextMenu(contextMenu)
}

function registShortCut () {
  if (!globalShortcut.isRegistered('Control+Shift+X')) {
    globalShortcut.register('Control+Shift+X', updateWP)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createTrap()
  registShortCut()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (tray === null) {
    createTrap()
  }
})
