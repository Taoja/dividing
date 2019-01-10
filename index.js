const rl = require('./lib/rl')
const env = require('./lib/env')
const { packages } = require('./lib/fs.js')

global._G = {}

env().then((env) => {
  _G.env = env
  rl(packages).then(function (md) {
    _G.packages = md
    require('./bin/index')()
  })
})
