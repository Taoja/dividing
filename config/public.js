const { isDev, type } = require('../lib/args')
const config = require('../lib/config')

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? config.dev.devtool : config.build.devtool,
  devServer: {
    clientLogLevel: 'warning',
    host: config.dev.host,    // 服务器的IP地址，可以使用IP也可以使用localhost
    compress: true,    // 服务端压缩是否开启
    port: config.dev.port, // 端口
    hot: true, //热替换
    noInfo: true,
    stats: 'errors-only',
    overlay: { //页面弹出错误信息
      warnings: false,
      errors: true
    },
    progress: true, //输出进度到控制台
    quiet: true,
    openPage: config.dev.open
  },
  externals: config.default.externals,
  resolve: config.default.resolve,
  module: {
    rules: [
      ...config.default.loader,
      type === 'single' ? {
        test: /src[\/|\\]modules[\/|\\][_a-zA-Z0-9]+[\/|\\][_a-zA-Z0-9]+[\/|\\][_a-zA-Z0-9]+[\/|\\]index.js/,
        use: {
          loader: 'vue-splitter/loader/pagesLoader.js',
        } 
      } : {}
    ]
  }
}