const rl = require('./lib/rl')
const env = require('./lib/env')
const { packages } = require('./lib/fs.js')

global._G = {}

var args = process.argv
var argEnv = args[0]
var argPackage = args.filter((e) => {
  return packages.indexOf(e) >= 0
})

if (argPackage.length > 0) {
  _G.env = argEnv[0]
  _G.packages = argPackage
  require('./bin/index')()
} else {
  env().then((env) => {
    _G.env = env
    rl(packages).then(function (md) {
      _G.packages = md.length == 0 ? packages : md
      require('./bin/index')()
    })
  })
}

