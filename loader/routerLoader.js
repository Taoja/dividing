
module.exports = function() {
  const entry = require(this.resourcePath)
  var exportLine = `
  import pages from 'pages'

  var loadPage = (path) => {
    return new Promise((a, b) => {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = () => {
        a(window.__pages[path].default)
        document.body.removeChild(script)
      }
      script.onerror = (err) => {
        b(err)
        document.body.removeChild(script)
      }
      script.src = path + '.js'
      document.body.appendChild(script)
    })
  }

  var routes = pages.map((a) => {
    var path = a.package + '/' + a.module + '/' + a.page
    return {
      path: '/' + path,
      name: path,
      component: () => {
        return loadPage(path)
      }
    }
  })
  routes.push({
    path: '/',
    redirect: '/${entry}'
  })

  window.__routes = routes
  `

  return exportLine
}
