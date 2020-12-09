const TetraMiddleware = require('@tetrajs/router').TetraMiddleware

class RequireAuthentication extends TetraMiddleware {
  get autoLoad() {
    return false
  }

  async handle(req, res, next) {
    if (req.isAuthenticated()) {
      await next()
    } else {
      res.redirect(req.usersIndexSignInPath())
    }
  }
}

module.exports = RequireAuthentication
