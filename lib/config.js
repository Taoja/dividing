const path = require('path')
const argv = process.argv
const configDir = argv.find(item => item === '-f') ? argv[argv.findIndex(item => item === '-f') + 1] ? argv[argv.findIndex(item => item === '-f') + 1] : 'webpack.config.js' : 'webpack.config.js'
const config = require(path.resolve(process.cwd(), configDir))
class Config extends config {
  get default () {
    return this.webpack(_G.env, _G.packages, _G.entrys, _G.config)
  }
}

module.exports = new Config()