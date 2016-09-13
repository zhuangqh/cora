const { app, Menu, Tray, globalShortcut } = require('electron')
const { updateWP, openCurWP, loadPrev, setQuality } = require('./controllers/wallpaper')

let tray = null

function createTrap () {
  tray = new Tray('./resources/icon/icon.png')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Change current wallpaper',
      accelerator: 'Ctrl+Shift+X',
      click: updateWP
    },
    {
      label: 'Load previous wallpaper',
      click: loadPrev
    },
    {
      label: 'Save current wallpaper',
      click: openCurWP
    },
    {
      type: 'separator'
    },
    {
      label: 'Wallpaper quality',
      submenu: [
        {
          label: 'Excellent',
          type: 'radio',
          click () {
            setQuality('full')
          }
        },
        {
          label: 'Regular',
          type: 'radio',
          checked: true,
          click () {
            setQuality('regular')
          }
        }
      ]
    },
    {
      label: 'Update interval',
      submenu: [
        {
          label: 'Every hour',
          type: 'radio'
        },
        {
          label: 'Every 3 hours',
          type: 'radio',
          checked: true
        }
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click () {
        app.quit()
      }
    }
  ])
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
