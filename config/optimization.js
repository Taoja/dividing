const { packages } = require('../lib/fs.js')
const config = require('../lib/config')

var chunkName = config.default.chunks && config.default.chunks.name ? config.default.chunks.name : 'chunk'
var test = config.default.chunks && config.default.chunks.test ? config.default.chunks.test : /[\\/]common|assets|components|node_modules[\\/]/

var choices = _G.packages
if (choices.length === 0) {
  choices = packages
}
var splitChunksGroup = {}
choices.forEach((e) => {
  splitChunksGroup[e] = {
    chunks: (m) => {
      return m.name.split('/')[0] == e
    },
    name: () => {
      return e + '/' + chunkName
    },
    test: test
  }
})
module.exports = {
  splitChunks: {
    cacheGroups: {
      default: false,
      ...splitChunksGroup
    }
  }
}