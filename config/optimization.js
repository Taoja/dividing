const { packages } = require('../lib/fs.js')
const config = require('../lib/config')

var chunksDefault = {
  name: 'chunk',
  test: /[\\/]assets[\\/]/,
  minChunks: 2
}

var chunksConfig = {
  ...chunksDefault,
}
var name = chunksConfig.name
delete chunksConfig.name

var choices = _G.packages
if (choices.length === 0) {
  choices = packages
}
var splitChunksGroup = {}

choices.forEach((e) => {
  splitChunksGroup[e] = {
    chunks: m => m.name.split('/')[0] == e,
    name: () => `${e}/${name}`,
    ...chunksConfig
  }
})
var splitChunks = {
  ...config.default.optimization.splitChunks || {}
}

delete config.default.optimization.splitChunks
module.exports = {
  splitChunks: {
    cacheGroups: {
      default: false,
      ...splitChunksGroup
    },
    ...splitChunks
  },
  ...config.default.optimization
}