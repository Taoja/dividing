const readline = require('readline')

function question (packages) {
  var rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    completer: function (line) {
      var inputList = line.split(' ')
      var input = inputList.pop()
      const hits = packages.filter((c) => c.startsWith(input));
      return [hits.length ? hits : packages, input];
    },
    prompt: '请输入需要打包的模块名，以空格分隔（不输入则全部打包）：'
  })
  rl.prompt()
  return new Promise((a) => {
    rl.on('line', function (e) {
      var md
      if (!e) {
        md = []
      } else {
        md = e.split(' ')
      }
      rl.close()
      console.log('正在打包...')
      a(md)
    })
  })
}

module.exports = question
