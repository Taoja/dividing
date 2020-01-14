const rl = require('./lib/rl')
const env = require('./lib/env')
const { packages, packageConfig } = require('./lib/fs.js')

global._G = {
  config: packageConfig
}

var args = process.argv.slice(2)
var argEnv = args[0]
var argPackage = args.filter((e) => {
  return packages.indexOf(e) >= 0
})

if (argPackage.length > 0) {
  _G.env = argEnv
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

