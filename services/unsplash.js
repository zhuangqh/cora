const rp = require('request-promise')
const request = require('request')
const fs = require('fs')
const path = require('path')
const wpUtil = require('wallpaper')
const { shell } = require('electron')

class unsplash {
  constructor (APPID) {
    this.APPID = APPID
    this.BASEURL = 'https://api.unsplash.com'
    this.photo = {}
  }

  setWallpaper () {
    wpUtil.set(this.photo.path)
  }

  random () {
    const options = {
      method: 'GET',
      uri: this._resolveUrl('/photos/random'),
      json: true
    }

    rp(options)
      .then(res => {
        this.photo.id = res.id

        this.photo.info = {
          created_at: res.created_at,
          downloads: res.downloads,
          likes: res.likes
        }

        this.photo.urls = res.urls
        this.path = null

        return this._downloadPhoto(this.photo.id, this.photo.urls.full)
      })
      .catch(err => {
        console.log(err)
      })
  }

  openPhoto () {
    shell.openItem(this.photo.path)
  }

  _downloadPhoto (id, url) {
    // const regx = /&fm=(.*?)&/g
    // let fm = regx.exec(url)
    let fm = 'jpg'
    if (fm) {
      this.photo.path = path.join(__dirname, '..', 'resources', 'wallpapers', `${id}.${fm}`)

      return new Promise((resolve, reject) => {
        try {
          request(url).pipe(fs.createWriteStream(this.photo.path))
            .on('finish', () => {
              console.log(this.photo.path)
              this.setWallpaper()
            })

          resolve()
        } catch (e) {
          reject(e)
        }
      })
    } else {
      return Promise.reject('format error')
    }
  }

  _resolveUrl (url) {
    return `${this.BASEURL}${url}?client_id=${this.APPID}`
  }
}

module.exports = unsplash
