const TetraController = require('@tetrajs/router').TetraController

class SignOutController extends TetraController {
  async index(req, res, next) {
    if (req.user) {
      req.logout()
    }
    return res.redirect(req.usersIndexSignInPath())
  }
}

module.exports = SignOutController
