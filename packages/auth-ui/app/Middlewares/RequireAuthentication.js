const { Middleware } = require('@tetrajs/router').decorators

@Middleware('require-authentication')
class RequireAuthentication {
  static global
  static autoload = false

  static async handle(req, res, next) {
    if (req.isAuthenticated()) {
      await next()
    } else {
      res.redirect(req.usersIndexSignInPath())
    }
  }
}

module.exports = RequireAuthentication
