const rl = require('./lib/rl')
const env = require('./lib/env')
const { packages } = require('./lib/fs.js')
const config = require('./lib/config')

global._G = {}

var args = process.argv
var argEnv = args.filter((e) => {
  return e in config.env
})
var argPackage = args.filter((e) => {
  return packages.indexOf(e) >= 0
})

if (argEnv.length > 0) {
  _G.env = argEnv[0]
  _G.packages = argPackage
  require('./bin/index')()
} else {
  env().then((env) => {
    _G.env = env
    rl(packages).then(function (md) {
      _G.packages = md
      require('./bin/index')()
    })
  })
}

