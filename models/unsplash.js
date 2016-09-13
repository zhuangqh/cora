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
    this.prevPhoto = null
    this.quality = 'regular'
  }

  getStat () {
    return this.photo.info
  }

  random () {
    const options = {
      method: 'GET',
      uri: this._resolveUrl('/photos/random'),
      json: true
    }

    this.prev = this.photo.id

    return this._getAndSetPhoto(options)
  }

  openPhoto () {
    shell.openItem(this.photo.path)
  }

  prevOne () {
    if (this.prev) {
      this._getPhotoById(this.prev)
      this.prev = null
    }
  }

  setQuality (quality) {
    if (quality === 'regular' || quality === 'full') {
      this.quality = quality
    }
  }

  _downloadPhoto (id, url) {
    this.photo.path = path.join(__dirname, '..', 'resources', 'wallpapers', `${id}.jpg`)

    return new Promise((resolve, reject) => {
      request(url).pipe(fs.createWriteStream(this.photo.path))
        .on('finish', () => {
          console.log(this.photo.path)
          wpUtil.set(this.photo.path)
          resolve()
        })
        .on('error', () => {
          reject()
        })
    })
  }

  _getAndSetPhoto (options) {
    return rp(options)
      .then(res => {
        this.photo.id = res.id

        this.photo.info = {
          created_at: res.created_at,
          downloads: res.downloads,
          likes: res.likes,
          author: res.user.name,
          homeLink: res.user.links.html
        }

        this.photo.urls = res.urls
        this.path = null

        return this._downloadPhoto(this.photo.id, this.photo.urls[this.quality])
      })
  }

  _getPhotoById (id) {
    const options = {
      method: 'GET',
      uri: this._resolveUrl(`/photos/${id}`),
      json: true
    }

    return this._getAndSetPhoto(options)
  }

  _resolveUrl (url) {
    return `${this.BASEURL}${url}?client_id=${this.APPID}`
  }
}

module.exports = unsplash
