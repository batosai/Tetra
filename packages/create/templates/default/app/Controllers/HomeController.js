const ApplicationController = require('./ApplicationController')

class HomeController extends ApplicationController {
  async index(req, res, next) {
    res.render(req.indexHomeView)
  }
}

module.exports = HomeController
