const TetraController = require('@tetrajs/router').TetraController
// const { security } = require('@tetrajs/core')

class ApplicationController extends TetraController {
  constructor(...args) {
    super(...args)

    this.middlewares = []
    // [{
    //   actions: [
    //     security.csrf.protection,
    //     security.csrf.token,
    //   ]
    // }]
  }
}

module.exports = ApplicationController
