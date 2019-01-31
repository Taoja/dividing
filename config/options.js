const { type } = require('../lib/args')
const build = require('../bin/build')
const { packages } = require('../lib/fs.js')

const io = require('./io')
const public = require('./public')
const plugins = require('./plugins')

const op = function () {
  var options = public

  if (type === 'multi') {
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
          return e + '/assets'
        },
        test: /[\\/]assets[\\/]/
      }
    })
    options.optimization = {
      splitChunks: {
        cacheGroups: {
          default: false,
          ...splitChunksGroup
        }
      }
    }
  }
  var {entry, output} = io()
  options.entry = entry
  options.output = output
  options.plugins = plugins()
  build(options)
}

module.exports = op;