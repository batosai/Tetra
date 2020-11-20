const TetraController = require('@tetrajs/router').TetraController

module.exports = class HomeController extends TetraController {
  async index(req, res, next) {
    return res.redirect(req.usersIndexSignInPath())
  }
}
