const resolve = require('./resolve')
const { pages, packages, packageConfig } = require('./fs')
const { type } = require('./args')
const config = require('../lib/config')
const static = require('../config/static')

var choices = _G.packages
if (choices.length === 0) {
  choices = packages
}
var entrys = {}

pages().forEach(function (a) {
  if (choices.includes(a.package)) {
    var source = config.default.packages ? `src/modules/${a.module}/${a.page}/index.js` : `src/modules/${a.package}/${a.module}/${a.page}/index.js`
    entrys[`${a.package}/${a.module}/${a.page}`] = resolve(source)
  }
})

if (type === 'single') {
  entrys[`${static.path}/js/main`] = resolve('src/index.js')
}
module.exports = entrys
