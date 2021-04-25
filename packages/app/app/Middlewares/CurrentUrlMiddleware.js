const { Middleware } = require('@tetrajs/router').decorators

@Middleware('current-url')
class CurrentUrlMiddleware {
  static global

  static async handle(req, res, next) {
    res.locals.currentUrl = req.url

    await next()
  }
}

module.exports = CurrentUrlMiddleware
