const { Middleware } = require('@tetrajs/router').decorators
const prettyBytes = require('pretty-bytes')

@Middleware('test')
class Test {
  static async handle(req, res, next) {
    res.locals.prettyBytes = prettyBytes
    await next()
  }
}

module.exports = Test
