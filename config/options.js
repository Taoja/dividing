const { type } = require('../lib/args')
const build = require('../bin/build')

const io = require('./io')
const public = require('./public')
const plugins = require('./plugins')
const optimization = require('./optimization')

const op = function () {
  var options = public

  if (type === 'multi') {
    options.optimization = optimization
  }
  var {entry, output} = io()
  options.entry = entry
  options.output = output
  options.plugins = plugins()
  build(options)
}

module.exports = op;