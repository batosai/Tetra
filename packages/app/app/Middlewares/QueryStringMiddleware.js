const TetraMiddleware = require('@tetrajs/router').TetraMiddleware

class QueryStringMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.qs = (...args) => {
      const ret = []

      for (let arg of args) {
        for (let data in arg) {
          ret.push(encodeURIComponent(data) + '=' + encodeURIComponent(arg[data]))
        }
      }

      return ret.join('&')
    }

    await next()
  }
}

module.exports = QueryStringMiddleware
