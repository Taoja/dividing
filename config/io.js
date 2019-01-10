const entrys = require('../lib/ps')
const resolve = require('../lib/resolve')
const config = require('../lib/config')
const {isDev, type} = require('../lib/args')

/**
 * 输出入口配置
 * @param {String|undefined} e 传入的离线包名称，如果传入则筛选出指定包名下的文件入口对象
 */
module.exports = function (e) {
  if (type === 'multi' && !isDev) {
    var multiEntry = {}
    for(var i in entrys) {
      var name = i.split('/')
      if (name[0] == e) {
        multiEntry[`${name[1]}/${name[2]}`] = entrys[i]
      }
    }
    return {
      entry: multiEntry,
      output: {
        path: `${resolve(config.default.output)}/${e}`,
        filename: `[name].js`,
        publicPath: '../'
      }
    }
  } else {
    if (type === 'multi') {
      return {
        entry: entrys,
        output: {
          path: resolve(config.default.output),
          filename: `[name].js`,
          publicPath: '../../'
        }
      }
    } else {
      return {
        entry: entrys,
        output: {
          path: resolve(config.default.output),
          filename: `[name].js`
        }
      }
    }
  }
}