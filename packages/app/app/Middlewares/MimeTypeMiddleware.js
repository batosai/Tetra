const { Middleware } = require('@tetrajs/router').decorators
const { mimeType } = require('@tetrajs/core').utils

@Middleware('mime-type')
class MimeTypeMiddleware {
  static global

  static async handle(req, res, next) {
    res.locals.mimeType = mimeType

    await next()
  }
}

module.exports = MimeTypeMiddleware
