const TetraMiddleware = require('@tetrajs/router').TetraMiddleware

class CurrentUrlMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.currentUrl = req.url

    await next()
  }
}

module.exports = CurrentUrlMiddleware
