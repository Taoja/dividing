const fs = require('fs')
const archiver = require('archiver')
const rmrf = require('rimraf')

const config = require('../lib/config')
const resolve = require('../lib/resolve')
const {__isEmptyObject} = require('../lib/help')

var outputdir = config.default.output
var packages = []
const dist = fs.readdirSync(resolve(outputdir))
dist.forEach(function (item) {
  let stat = fs.lstatSync(resolve( `${outputdir}/${item}`))
  if (stat.isDirectory() === true) { 
    packages.push(item)
  }
})
packages.forEach(function (item) {
  var zipName,outputName
  if (!__isEmptyObject(config.default.packageID)) {
    if (item in config.default.packageID) {
      zipName = `${config.default.packageID[item]}`
    } else {
      zipName = `${config.default.packageID.static}`
    }
    outputName = `${zipName}/${item}`
  } else {
    zipName = item
    outputName = `${zipName}`
  }
  var output = fs.createWriteStream(resolve(`${outputdir}/${zipName}.zip`))
  output.on('close', function() {
    rmrf(resolve(`${outputdir}/${item}`), () => {})
  })
  var ac = archiver('zip', {
    zlib: { level: 9 }
  })
  ac.pipe(output)
  ac.directory(resolve(`${outputdir}/${item}/`), `${outputName}`)
  ac.finalize()
})
