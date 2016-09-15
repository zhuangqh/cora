const { app, Menu, shell, BrowserWindow } = require('electron')

const Unsplash = require('../models/unsplash')
const Scheduler = require('../models/scheduler')

class UIController {
  constructor (tray, loadingView, aboutView) {
    this.tray = tray
    this.loadingView = loadingView
    this.showLoadingView = true
    // put the loading view under the tray icon
    const bound = this.tray.getBounds()
    this.loadingView.setPosition(bound.x - (this.loadingView.getBounds().width - bound.width) / 2, bound.y)

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
            click: () => {
              this.scheduler.setInterval(12)
            }
          },
          {
            label: 'Every day',
            type: 'radio',
            click: () => {
              this.scheduler.setInterval(24)
            }
          }
        ]
      },
      {
        label: 'Toggle update notification',
        click: () => {
          this.showLoadingView = !this.showLoadingView
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'About',
        click: this.createAboutView
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

  createAboutView () {
    // about this application
    let aboutView = new BrowserWindow({
      width: 300,
      height: 400,
      title: 'About',
      resizable: true
    })
    aboutView.loadURL(`file://${__dirname}/../views/about.html`)
    aboutView.on('close', (e) => {
      aboutView = null
    })
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
      if (this.showLoadingView) {
        this.loadingView.show()
        this.loadingView.focus()
      }

      this.unsplash.random().then(() => {
        updatePhotoStat()
        this.loadingView.hide()
      })
    }
  }
}

module.exports = UIController
