const TetraController = require('@tetrajs/router').TetraController

class HomeController extends TetraController {
  async index(req, res, next) {
    return res.redirect(req.usersIndexSignInPath())
  }
}

module.exports = HomeController
