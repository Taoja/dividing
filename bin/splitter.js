const splitter = function (path) {
  return new Promise(function (a, b) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = function () {
      a(window.__pages[path].default)
      document.body.removeChild(script)
    }
    script.onerror = function (err) {
      b(err)
      document.body.removeChild(script)
    }
    script.src = path + '.js'
    document.body.appendChild(script)
  })
}

export default splitter