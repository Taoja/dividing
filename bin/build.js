const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const opn = require('opn')

const { isDev } = require('../lib/args')
const { afterBuild } = require('../lib/config')

function build (options) {

  if (isDev) {
    options.forEach((e) => {
      webpackDevServer.addDevServerEntrypoints(e, e.devServer)
    })
  }
  
  const compiler = webpack(options)
  
  if (isDev) {
    var server = new webpackDevServer(compiler, options[0].devServer)
    server.listen(options[0].devServer.port, options[0].devServer.host, ()=> {
      if (options[0].devServer.openPage) {
        opn(`http://${options[0].devServer.host}:${options[0].devServer.port}${options[0].devServer.openPage}`)
      }
    })
  } else {
    compiler.run(() => {
      afterBuild && afterBuild()
    })
  }
}

module.exports = build