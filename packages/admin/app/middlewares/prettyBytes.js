const prettyBytes = require('pretty-bytes')

module.exports = function(req, res, next) {
  res.locals.prettyBytes = prettyBytes
  next()
}
