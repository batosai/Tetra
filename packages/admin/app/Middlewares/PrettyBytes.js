const { Middleware } = require('@tetrajs/router').decorators
const prettyBytes = require('pretty-bytes')

@Middleware('pretty-bytes')
class PrettyBytes {
  static async handle(req, res, next) {
    res.locals.prettyBytes = prettyBytes
    await next()
  }
}

module.exports = PrettyBytes
