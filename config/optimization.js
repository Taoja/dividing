const { packages } = require('../lib/fs.js')
const config = require('../lib/config')

var chunksDefault = {
  name: 'chunk',
  test: /[\\/]common|assets|components|node_modules[\\/]/,
  minChunks: 2
}

var chunksConfig = {
  ...chunksDefault,
  ...config.default.chunks
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
module.exports = {
  splitChunks: {
    cacheGroups: {
      default: false,
      ...splitChunksGroup
    }
  }
}