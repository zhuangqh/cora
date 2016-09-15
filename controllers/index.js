const Unsplash = require('../models/unsplash')
const Scheduler = require('../models/scheduler')
const { app, Menu, shell } = require('electron')

class UIController {
  constructor (tray) {
    this.tray = tray
    this.unsplash = new Unsplash('2fc59277f98c09117bb7d3a2d1b718bb45bedd18477de21716cdfdc6323cae29')
    this._generateUpdator()
    this.template = [
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
        click: this.updateWP
      },
      {
        label: 'Load previous wallpaper',
        click: () => {
          this.unsplash.prevOne()
        }
      },
      {
        label: 'Save current wallpaper',
        click: () => {
          this.unsplash.openPhoto()
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
            click: () => {
              this.unsplash.setQuality('full')
            }
          },
          {
            label: 'Regular',
            type: 'radio',
            checked: true,
            click: () => {
              this.unsplash.setQuality('regular')
            }
          }
        ]
      },
      {
        label: 'Update interval',
        submenu: [
          {
            label: 'Every hour',
            type: 'radio',
            click: () => {
              this.scheduler.setInterval(1)
            }
          },
          {
            label: 'Every 3 hours',
            type: 'radio',
            checked: true,
            click: () => {
              this.scheduler.setInterval(3)
            }
          },
          {
            label: 'Every 12 hours',
            type: 'radio',
            checked: true,
            click: () => {
              this.scheduler.setInterval(12)
            }
          },
          {
            label: 'Every day',
            type: 'radio',
            checked: true,
            click: () => {
              this.scheduler.setInterval(24)
            }
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
    this.scheduler = new Scheduler(this.updateWP)
    this.scheduler.run()
  }

  getTemplate () {
    return this.template
  }

  getUpdator () {
    return this.updateWP
  }

  _generateUpdator () {
    const updatePhotoStat = () => {
      const info = this.unsplash.getStat()

      if (info) {
        this.template[0].enabled = true
        this.template[0].submenu = [
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

        const menu = Menu.buildFromTemplate(this.template)
        this.tray.setContextMenu(menu)
      }
    }

    this.updateWP = () => {
      console.log('update...')
      this.unsplash.random().then(() => {
        updatePhotoStat()
      })
    }
  }
}

module.exports = UIController
