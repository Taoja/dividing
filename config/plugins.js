const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('../lib/config')
const {path, publicPath} = require('./static')
const {isDev, type, dashboard} = require('../lib/args')
const resolve = require('../lib/resolve')
const entrys = require('../lib/ps')

if (dashboard) {
  var Dashboard = require('webpack-dashboard');
  var DashboardPlugin = require('webpack-dashboard/plugin');
  var dashboardConfig = new Dashboard();
}

module.exports = function (e) {
  var configEnv = {}
  var configGlobal = {}
  for (key in config.default.global) {
    configGlobal[key] = JSON.stringify(config.default.global[key])
  }
  for (key in config.default.env) {
    configEnv[key] = JSON.stringify(config.default.env[key])
  }
  var plugins = [
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
  if (isDev) {
    if (dashboard) {
      plugins.push(new DashboardPlugin(dashboardConfig.setData))
    } else {
      plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`应用已启动，请访问：http://${config.dev.host}:${config.dev.port}`]
        }
      }))
    }
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }


  if (type === 'multi') {
    var HWPs = []
    if (isDev) {
      for (var item in entrys) {
        HWPs.push(
          new HtmlWebpackPlugin({ //入口配置
            filename: `${item}.html`,// 生成文件名
            template: 'index.html', // 模板文件
            chunks: [`${item}`],
            static: publicPath + path
          })
        )
      }
      return [
        ...HWPs,
        ...plugins,
        ...config.default.plugins
      ]
    } else {
      for (var item in entrys) {
        var name = item.split('/')
        if (name[0] === e) {
          HWPs.push(
            new HtmlWebpackPlugin({ //入口配置
              filename: `${name[1]}/${name[2]}.html`,// 生成文件名
              template: 'index.html', // 模板文件
              chunks: [`${name[1]}/${name[2]}`],
              static: publicPath + path
            })
          )
        }
      }
      return [
        ...HWPs,
        ...plugins,
        ...config.default.plugins
      ]
    }
  } else {
    return [
      new HtmlWebpackPlugin({ //入口配置
        filename: `index.html`,// 生成文件名
        template: 'index.html', // 模板文件
        chunks: [`${path}/js/main`],
        static: path
      }),
      ...plugins,
      ...config.default.plugins
    ]
  }
}