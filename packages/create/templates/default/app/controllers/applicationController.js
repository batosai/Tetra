const BaseController = require('@tetrajs/router').baseController
// const { security } = require('@tetrajs/core')

module.exports = class ApplicationController extends BaseController {
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
