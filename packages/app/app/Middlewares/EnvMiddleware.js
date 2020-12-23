const TetraMiddleware = require('@tetrajs/router').TetraMiddleware
const { Env } = require('@tetrajs/core')

class EnvMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    res.locals.env = function() {
      return Env.get('NODE_ENV')
    }

    await next()
  }
}

module.exports = EnvMiddleware
