const fs = require('fs')
const resolve = require('./resolve')

var packages = []
var packageConfig = {}
var pages

const package = fs.readdirSync(resolve('src/modules'))
package.forEach(function (item) {
  let stat = fs.lstatSync(resolve( "src/modules/" + item))
  if (stat.isDirectory() === true) { 
    packages.push(item)
  }
})

var packageInfos = function (e) {
  return require(resolve('src/modules/' + e))
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
