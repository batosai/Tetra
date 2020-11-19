const ApplicationController = require('./ApplicationController')

module.exports = class HomeController extends ApplicationController {
  async index(req, res, next) {
    res.render(req.adminIndexHomeView)
  }
}
