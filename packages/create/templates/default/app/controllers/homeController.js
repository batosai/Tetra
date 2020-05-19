const ApplicationController = require('./applicationController')

module.exports = class HomeController extends ApplicationController {
  async index(req, res, next) {
    res.render(req.indexHomeView)
  }
}
