const TetraController = require('@tetrajs/router').TetraController

class ApplicationController extends TetraController {
  constructor(...args) {
    super(...args)

    this.middlewares = []
  }
}

module.exports = ApplicationController
