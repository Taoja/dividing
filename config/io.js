const entrys = require('../lib/ps')
const resolve = require('../lib/resolve')
const config = require('../lib/config')
const {__isEmptyObject} = require('../lib/help')
var output
if (__isEmptyObject(config.default.output)) {
  output = {
    path: resolve('dist'),
    filename: `[name].js`,
    publicPath: '../../'
  }
} else if (typeof config.default.output == 'string') {
  output = {
    path: resolve(config.default.output),
    filename: `[name].js`,
    publicPath: '../../'
  }
} else if (typeof config.default.output == 'object') {
  output = {
    path: resolve('dist'),
    filename: `[name].js`,
    publicPath: '../../',
    ...config.default.output
  }
}

var io = {
  entry: entrys,
  output
}
module.exports = io
