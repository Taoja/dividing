const fs = require('fs')
const resolve = require('./resolve')
const config = require('../lib/config')

var packages = []
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

pages = function () {
  var e = _G.packages
  if (e.length == 0) e = packages
  var pagelist = []
  e.forEach(function (a) {
    var packageInfo = packageInfos(a)
    for (var i in packageInfo) {
      for (var j in packageInfo[i]) {
        pagelist.push({
          package: a,
          module: i,
          page: j
        })
      }
    }
  })
  return pagelist
}

var packageInfos = function (e) {
  if (typeof config.default.packages == 'object') {
    return config.default.packages[e]
  } else {
    return require(resolve('src/modules/' + e))
  }
}

module.exports = {
  packages,
  pages,
}
