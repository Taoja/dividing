const readline = require('readline')
const config = require('./config')
function env () {
  var envs = []
  for(var i in config.env) {
    envs.push(i)
  }
  var defaultEnv
  for (var i in config.env) {
    defaultEnv = i
    break
  }
  var rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    completer: function (line) {
      var inputList = line.split(' ')
      var input = inputList.pop()
      const hits = envs.filter((c) => c.startsWith(input));
      return [hits.length ? hits : envs, input];
    },
    prompt: `请输入运行的环境（默认${defaultEnv}）：`
  })
  rl.prompt()
  return new Promise((a) => {
    rl.on('line', function (e) {
      if (!e) {
        e = defaultEnv
      }
      rl.close()
      a(e)
    })
  })
}

module.exports = env
