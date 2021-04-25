const { Middleware } = require('@tetrajs/router').decorators
const { qs } = require('@tetrajs/core').utils

@Middleware('qs')
class QueryStringMiddleware {
  static global

  static async handle(req, res, next) {
    res.locals.qs = qs

    await next()
  }
}

module.exports = QueryStringMiddleware
