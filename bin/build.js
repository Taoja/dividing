const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const httpProxyMiddleware = require('http-proxy-middleware')
const opn = require('opn')

const { isDev } = require('../lib/args')

function build (options) {

  if (isDev) {
    webpackDevServer.addDevServerEntrypoints(options, options.devServer)
  }
  
  const compiler = webpack(options)
  
  if (isDev) {
    var server = new webpackDevServer(compiler, options.devServer)
    for (var key in options.devServer.proxy) {
      server.use(key, httpProxyMiddleware(options.devServer.proxy[key]))
    }
    server.listen(options.devServer.port, options.devServer.host, ()=> {
      if (options.devServer.openPage) {
        opn(`http://${options.devServer.host}:${options.devServer.port}${options.devServer.openPage}`)
      }
    })
  } else {
    compiler.run((err, stats) => {
      console.log(err)
    })
  }
}

module.exports = build