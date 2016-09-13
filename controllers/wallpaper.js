const Unsplash = require('../models/unsplash')
const { app, Menu, shell } = require('electron')

const unsplash = new Unsplash('2fc59277f98c09117bb7d3a2d1b718bb45bedd18477de21716cdfdc6323cae29')

const getTemplate = (tray) => {
  let template = [
    {
      label: 'About photo',
      enabled: false
    },
    {
      type: 'separator'
    },
    {
      label: 'Change current wallpaper',
      accelerator: 'Ctrl+Shift+X',
      click () {
        unsplash.random().then(() => {
          updatePhotoStat()
        })
      }
    },
    {
      label: 'Load previous wallpaper',
      click () {
        unsplash.prevOne()
      }
    },
    {
      label: 'Save current wallpaper',
      click () {
        unsplash.openPhoto()
      }
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
            unsplash.setQuality('full')
          }
        },
        {
          label: 'Regular',
          type: 'radio',
          checked: true,
          click () {
            unsplash.setQuality('regular')
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
  ]

  function updatePhotoStat () {
    const info = unsplash.getStat()

    if (info) {
      template[0].enabled = true
      template[0].submenu = [
        {
          label: `Photographer: ${info.author}`,
          click () {
            shell.openExternal(info.homeLink)
          }
        },
        {
          label: 'created at: ' + info.created_at.slice(0, 10),
          enabled: false
        }, {
          label: `downloads: ${info.downloads}`,
          enabled: false
        }, {
          label: `likes: ${info.likes}`,
          enabled: false
        }
      ]

      const menu = Menu.buildFromTemplate(template)
      tray.setContextMenu(menu)
    }
  }

  return template
}

module.exports = {
  updateWP () {
    unsplash.random()
  },
  getTemplate
}
