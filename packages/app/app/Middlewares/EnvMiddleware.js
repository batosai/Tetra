const { Middleware } = require('@tetrajs/router').decorators
const { Env } = require('@tetrajs/core')

@Middleware('env')
class EnvMiddleware {
  static global

  static async handle(req, res, next) {
    res.locals.env = function() {
      return Env.get('NODE_ENV')
    }

    await next()
  }
}

module.exports = EnvMiddleware
