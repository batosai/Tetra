const TetraMiddleware = require('@tetrajs/router').TetraMiddleware
const { permitParameters } = require('@tetrajs/core').utils


class PermitParametersMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    req.permitParameters = permitParameters

    await next()
  }
}

module.exports = PermitParametersMiddleware
