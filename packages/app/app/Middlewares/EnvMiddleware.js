const TetraMiddleware = require('@tetrajs/router').TetraMiddleware

class EnvMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.env = function() {
      return process.env.NODE_ENV
    }

    await next()
  }
}

module.exports = EnvMiddleware
