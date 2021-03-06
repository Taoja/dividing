const build = require('../bin/build')

const {entry, output} = require('./io')
const public = require('./public')
const plugins = require('./plugins')
const optimization = require('./optimization')

const op = function () {
  var options = public

  options.optimization = optimization
  options.entry = entry
  options.output = output
  options.plugins = plugins
  build(options)
}

module.exports = op;