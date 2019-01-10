var path = require('path')

module.exports = function() {
  const pages = path.basename(this.context)
  const modules = path.basename(path.dirname(this.context))
  const packages = path.basename(path.dirname(path.dirname(this.context)))
  let source = `
  const page = require('./index.vue');
  window.__pages = {
    ...window.__pages,
    ...{
      '${packages}/${modules}/${pages}': page
    }
  }`
  return source
}