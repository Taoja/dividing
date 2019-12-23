const { isDev } = require('../lib/args')
const config = require('../lib/config')

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: config.default.devtool,
  devServer: {
    clientLogLevel: 'warning',
    host: '0.0.0.0',    // 服务器的IP地址，可以使用IP也可以使用localhost
    compress: true,    // 服务端压缩是否开启
    port: 8082, // 端口
    hot: true, //热替换
    noInfo: true,
    overlay: { //页面弹出错误信息
      warnings: false,
      errors: true
    },
    progress: true, //输出进度到控制台
    quiet: true,
    ...config.default.devServer
  },
  performance: {
    hints: false,
    ...config.default.performance
  },
  externals: config.default.externals,
  resolve: config.default.resolve,
  module: {
    ...config.default.module
  }
}