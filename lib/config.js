const path = require('path')
const config = require(path.resolve(process.cwd(), 'webpack.config.js'))
class Config extends config {
  get default () {
    return this.webpack(_G.env, _G.packages, _G.entrys, _G.config)
  }
}

module.exports = new Config()