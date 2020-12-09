const TetraMiddleware = require('@tetrajs/router').TetraMiddleware
const prettyBytes = require('pretty-bytes')

class PrettyBytes extends TetraMiddleware {
  async handle(req, res, next) {
    res.locals.prettyBytes = prettyBytes
    await next()
  }
}

module.exports = PrettyBytes
