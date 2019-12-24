const rmrf = require('rimraf')
const entrys = require('../lib/ps')
global._G.entrys = entrys
const config = require('../lib/config')
const resolve = require('../lib/resolve')
const options = require('../config/options')
const { isDev } = require('../lib/args')

const rm = function () {
  if (isDev) {
    options()
  } else {
    rmrf(resolve(config.default.output), function() {
      options()
    })
  }
}
module.exports = rm