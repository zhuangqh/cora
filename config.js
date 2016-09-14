const path = require('path')

let config = {
  name: 'cora',
  building: {
    arch: 'x64',
    asar: true,
    dir: '.',
    ignore: /node_modules\/.bin/,
    out: path.join(__dirname, 'builds'),
    overwrite: true,
    platform: 'darwin'
  }
}

module.exports = config
