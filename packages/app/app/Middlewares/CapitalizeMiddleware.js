const { Middleware } = require('@tetrajs/router').decorators
const { capitalize } = require('@tetrajs/core').utils

@Middleware('capitalize')
class CapitalizeMiddleware {
  static global

  static async handle(req, res, next) {
    res.locals.capitalize = capitalize

    await next()
  }
}

module.exports = CapitalizeMiddleware
