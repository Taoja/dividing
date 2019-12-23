const entrys = require('../lib/ps')
const resolve = require('../lib/resolve')
const config = require('../lib/config')

var io = {
  entry: entrys,
  output: {
    path: resolve(config.default.output),
    filename: `[name].js`,
    publicPath: '../../'
  }
}
module.exports = io
