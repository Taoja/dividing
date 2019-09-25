const entrys = require('../lib/ps')
const resolve = require('../lib/resolve')
const config = require('../lib/config')
const {type} = require('../lib/args')

var io = {}
if (type === 'multi') {
  io = {
    entry: entrys,
    output: {
      path: resolve(config.default.output),
      filename: `[name]-[hash].js`,
      publicPath: '../../'
    }
  }
} else {
  io = {
    entry: entrys,
    output: {
      path: resolve(config.default.output),
      filename: `[name]-[hash].js`
    }
  }
}
module.exports = io
