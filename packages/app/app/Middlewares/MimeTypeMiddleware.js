const TetraMiddleware = require('@tetrajs/router').TetraMiddleware
const { mimeTypes } = require('@tetrajs/core').utils

class MimeTypeMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.mimeTypes = mimeTypes

    await next()
  }
}

module.exports = MimeTypeMiddleware
