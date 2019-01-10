const path = require('path')
const { dir } = require('./config')
const resolve = function (e) {
  return path.resolve(dir, e)
}

module.exports = resolve