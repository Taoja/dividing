const { packages } = require('../lib/fs.js')
const config = require('../lib/config')

var chunksDefault = {
  name: 'chunk',
  test: /[\\/]common|assets|components|node_modules[\\/]/
}

var {name, test} = {
  ...chunksDefault,
  ...config.default.chunks
}

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
      return `${e}/${name}`
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