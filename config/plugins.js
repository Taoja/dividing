const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const config = require('../lib/config')
const {isDev, dashboard} = require('../lib/args')

const setConf = require('../plugins/setConf')

if (dashboard) {
  var Dashboard = require('webpack-dashboard');
  var DashboardPlugin = require('webpack-dashboard/plugin');
  var dashboardConfig = new Dashboard();
}

var plugins = [
  new setConf(),
]
if (dashboard) {
  plugins.push(new DashboardPlugin(dashboardConfig.setData))
} else {
  plugins.push(new FriendlyErrorsWebpackPlugin())
}
if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

plugins = [
  ...plugins,
  ...config.default.plugins
]
module.exports = plugins