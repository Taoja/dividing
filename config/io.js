const entrys = require('../lib/ps')
const resolve = require('../lib/resolve')
const config = require('../lib/config')
const {type} = require('../lib/args')

/**
 * 输出入口配置
 * @param {String|undefined} e 传入的离线包名称，如果传入则筛选出指定包名下的文件入口对象
 */
var io = {}
if (type === 'multi') {
  io = {
    entry: entrys,
    output: {
      path: resolve(config.default.output),
      filename: `[name].js`,
      publicPath: '../../'
    }
  }
} else {
  io = {
    entry: entrys,
    output: {
      path: resolve(config.default.output),
      filename: `[name].js`
    }
  }
}
module.exports = io
