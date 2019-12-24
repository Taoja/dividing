const readline = require('readline')

function env () {
  var rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    prompt: `请输入运行的环境：`
  })
  rl.prompt()
  return new Promise((a) => {
    rl.on('line', function (e) {
      rl.close()
      a(e)
    })
  })
}

module.exports = env
