const resolve = require('./resolve')
const { pages, packages, packageConfig } = require('./fs')

var choices = _G.packages
if (choices.length === 0) {
  choices = packages
}
var entrys = {}

pages().forEach(function (a) {
  if (choices.includes(a.package)) {
    var source = `src/modules/${a.package}/${a.module}/${a.page}/index.js`
    entrys[`${a.package}/${a.module}/${a.page}`] = resolve(source)
  }
})

module.exports = entrys
