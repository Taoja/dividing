const {packageConfig} = require('../lib/fs')

class setConf {
  apply(compiler) {
    compiler.hooks.entryOption.tap('setConf', () => {
      compiler._packageConfig = packageConfig
    })
  }
}

module.exports = setConf;