const BaseController = require('@tetrajs/router').baseController

module.exports = class SignOutController extends BaseController {
  async index(req, res, next) {
    if (req.user) {
      req.logout()
    }
    return res.redirect(req.usersIndexSignInPath())
  }
}
