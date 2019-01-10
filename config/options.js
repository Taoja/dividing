const { isDev, type } = require('../lib/args')
const build = require('../bin/build')
const { packages } = require('../lib/fs.js')

const io = require('./io')
const public = require('./public')
const plugins = require('./plugins')

const op = function () {
  var options = public

  if (type === 'multi' && !isDev) {
    var choices = _G.packages
    if (choices.length === 0) {
      choices = packages
    }
    var optionsList = choices.map((a) => {
      var {entry, output} = io(a)
      return {
        ...options,
        output: output,
        entry: entry,
        plugins: plugins(a)
      }
    })
    build(optionsList)
  } else {
    var {entry, output} = io()
    options.entry = entry
    options.output = output
    options.plugins = plugins()
    build([options])
  }
}

module.exports = op;