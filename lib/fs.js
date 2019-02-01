const fs = require('fs')
const resolve = require('./resolve')
const config = require('../lib/config')

var packages = []
var packageConfig = {}
var pages

if (typeof config.default.packages == 'object') {
  for(var item in config.default.packages) {
    packages.push(item)
  }
} else {
  const package = fs.readdirSync(resolve('src/modules'))
  package.forEach(function (item) {
    let stat = fs.lstatSync(resolve( "src/modules/" + item))
    if (stat.isDirectory() === true) { 
      packages.push(item)
    }
  })
}

var packageInfos = function (e) {
  if (typeof config.default.packages == 'object') {
    return config.default.packages[e]
  } else {
    return require(resolve('src/modules/' + e))
  }
}

packages.forEach(function(a) {
  var packageInfo = packageInfos(a)
  packageConfig[a] = packageInfo
})

pages = function () {
  var e = _G.packages
  if (e.length == 0) e = packages
  var pagelist = []
  e.forEach(function (a) {
    if (packageConfig.hasOwnProperty(a)) {
      for (var i in packageConfig[a]) {
        for (var j in packageConfig[a][i]) {
          pagelist.push({
            package: a,
            module: i,
            page: j
          })
        }
      }
    }
  })
  return pagelist
}

module.exports = {
  packages,
  pages,
  packageConfig
}
