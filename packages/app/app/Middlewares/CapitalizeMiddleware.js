const TetraMiddleware = require('@tetrajs/router').TetraMiddleware
const { capitalize } = require('@tetrajs/core').utils

class CapitalizeMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.capitalize = capitalize

    await next()
  }
}

module.exports = CapitalizeMiddleware
