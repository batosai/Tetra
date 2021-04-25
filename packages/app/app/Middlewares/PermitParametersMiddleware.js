const { Middleware } = require('@tetrajs/router').decorators
const { permitParameters } = require('@tetrajs/core').utils

@Middleware('permit-parameters')
class PermitParametersMiddleware {
  static global

  static async handle(req, res, next) {
    req.permitParameters = permitParameters

    await next()
  }
}

module.exports = PermitParametersMiddleware
