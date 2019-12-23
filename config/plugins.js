const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('../lib/config')
const {path, publicPath} = require('./static')
const {isDev, dashboard} = require('../lib/args')
const resolve = require('../lib/resolve')
const entrys = require('../lib/ps')

const setConf = require('../plugins/setConf')

if (dashboard) {
  var Dashboard = require('webpack-dashboard');
  var DashboardPlugin = require('webpack-dashboard/plugin');
  var dashboardConfig = new Dashboard();
}

var configEnv = {}
var configGlobal = {}
for (key in config.global) {
  configGlobal[key] = JSON.stringify(config.global[key])
}
for (key in config.env) {
  configEnv[key] = JSON.stringify(config.env[key])
}
var plugins = [
  new setConf(),
  new CopyWebpackPlugin([
    { 
      from: resolve('static'), 
      to: resolve(`${config.default.output}/${path}`)
    }
  ]),
  new webpack.DefinePlugin({
    'Global': configGlobal,
    'ENV': configEnv[_G.env]
  })
]
if (dashboard) {
  plugins.push(new DashboardPlugin(dashboardConfig.setData))
} else {
  plugins.push(new FriendlyErrorsWebpackPlugin())
}
if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}


var HWPs = []
for (var item in entrys) {
  HWPs.push(
    new HtmlWebpackPlugin({ //入口配置
      filename: `${item}.html`,// 生成文件名
      template: 'index.html', // 模板文件
      chunks: [`${item}`, `${item.split('/')[0]}/chunk`],
      static: publicPath + path,
      hash: true
    })
  )
}
plugins = [
  ...HWPs,
  ...plugins,
  ...config.default.plugins
]
module.exports = plugins