const TetraMiddleware = require('@tetrajs/router').TetraMiddleware
const { qs } = require('@tetrajs/core').utils

class QueryStringMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.qs = qs

    await next()
  }
}

module.exports = QueryStringMiddleware
