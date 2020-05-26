const BaseController = require('@tetrajs/router').baseController

module.exports = class HomeController extends BaseController {
  async index(req, res, next) {
    return res.redirect(req.usersIndexSignInPath())
  }
}
