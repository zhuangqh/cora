const Unsplash = require('../services/unsplash')

const unsplash = new Unsplash('2fc59277f98c09117bb7d3a2d1b718bb45bedd18477de21716cdfdc6323cae29')

module.exports = {
  updateWP () {
    unsplash.random()
  },
  openCurWP () {
    unsplash.openPhoto()
  },
  loadPrev () {
    unsplash.prevOne()
  },
  setQuality (quality) {
    unsplash.setQuality(quality)
  }
}
