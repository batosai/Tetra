const TetraMiddleware = require('@tetrajs/router').TetraMiddleware

class CapitalizeMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

    await next()
  }
}

module.exports = CapitalizeMiddleware
