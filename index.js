const { app, Menu, Tray } = require('electron')

let tray = null

function createTrap () {
  tray = new Tray('./resources/icon/icon.png')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Change current wallpaper',
      accelerator: 'Control+Shift+X',
      click () {
        console.log('item 1 clicked')
      }
    },
    {
      label: 'Save current wallpaper',
      click () {
        console.log('item 2 clicked')
      }
    },
    {
      type: 'separator'
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createTrap)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (tray === null) {
    createWindow()
  }
})
