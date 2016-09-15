const { app, Menu, Tray, globalShortcut } = require('electron')
const path = require('path')
const UIController = require('./controllers')

let tray = null
let controller = null

function createTrap () {
  tray = new Tray(path.join(__dirname, 'resources', 'icon', 'icon.png'))
  controller = new UIController(tray)

  const contextMenu = Menu.buildFromTemplate(controller.getTemplate())
  tray.setToolTip('cora')
  tray.setContextMenu(contextMenu)
}

function registShortCut () {
  if (!globalShortcut.isRegistered('Control+Shift+X')) {
    globalShortcut.register('Control+Shift+X', controller.getUpdator())
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
