const { getOptions } = require('loader-utils');
const urlLoader = require('url-loader')

module.exports = function (src) {
  const options = getOptions(this) || {};
  
  var issuer = this._module.issuer.context.split('/')
  var packageName = issuer[issuer.length - 3]
  if (packageName == 'src') {
    console.log(this._module.issuer)
  }
  let limit = options.limit;

  if (limit) {
    limit = parseInt(limit, 10);
  }

  if (limit && src.length >= limit) {
    options.outputPath = packageName
  }

  return urlLoader.call(this, src);
}
