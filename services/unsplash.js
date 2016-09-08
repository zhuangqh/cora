const rp = require('request-promise')

class unsplash {
  constructor (APPID) {
    this.APPID = APPID
    this.BASEURL = 'https://api.unsplash.com'
  }

  _resolveUrl (url) {
    return `${this.BASEURL}${url}?client_id=${this.APPID}`
  }

  random () {
    const options = {
      method: 'GET',
      uri: this._resolveUrl('/photos/random'),
      json: true
    }

    return rp(options)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = unsplash
