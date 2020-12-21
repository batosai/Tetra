const TetraMiddleware = require('@tetrajs/router').TetraMiddleware
const { mimeType } = require('@tetrajs/core').utils

class MimeTypeMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.mimeType = mimeType

    await next()
  }
}

module.exports = MimeTypeMiddleware
