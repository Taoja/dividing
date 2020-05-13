const rmrf = require('rimraf')
const entrys = require('../lib/ps')
global._G.entrys = entrys
const config = require('../lib/config')
const resolve = require('../lib/resolve')
const options = require('../config/options')
const { isDev } = require('../lib/args')
const {__isEmptyObject} = require('../lib/help')

var output
if (__isEmptyObject(config.default.output)) {
  output = resolve('dist')
} else if (typeof config.default.output == 'string') {
  output = resolve(config.default.output)
} else if (typeof config.default.output == 'object') {
  output = config.default.output.path
}

const rm = function () {
  if (isDev) {
    options()
  } else {
    rmrf(resolve(output), function() {
      options()
    })
  }
}
module.exports = rm