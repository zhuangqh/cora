const { app, Menu, Tray, globalShortcut, BrowserWindow } = require('electron')
const fs = require('fs')
const os = require('os')
const path = require('path')
const UIController = require('./controllers')

let tray = null
let controller = null
let loadingView = null
let aboutView = null

const LOADING_WIDTH = 140
const LOADING_HEIGHT = 60


function createTrap () {
  tray = new Tray(path.join(__dirname, 'resources', 'icon', 'icon.png'))

  // show the loading animation while updating wallpaper
  loadingView = new BrowserWindow({
    width: LOADING_WIDTH,
    height: LOADING_HEIGHT,
    title: 'Loading',
    resizable: false,
    transparent: true,
    frame: false,
    show: false
  })
  loadingView.loadURL(`file://${__dirname}/views/loading.html`)
  loadingView.on('close', () => {
    loadingView = null
  })

  controller = new UIController(tray, loadingView, aboutView)

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
  app.quit()

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

// create a directory if not exists to save temporary file
const tmpDir = path.join(os.homedir(), 'Documents', 'cora')
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir)
}
