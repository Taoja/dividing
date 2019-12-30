const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const config = require('../lib/config')
const {isDev} = require('../lib/args')

const setConf = require('../plugins/setConf')

var plugins = [
  new setConf(),
  new FriendlyErrorsWebpackPlugin()
]

if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

plugins = [
  ...plugins,
  ...config.default.plugins
]
module.exports = plugins