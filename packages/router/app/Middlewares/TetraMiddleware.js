class TetraMiddleware {
  get autoLoad() {
    return true
  }

  get globalAccess() {
    return false
  }

  get externalModule() {
    return false
  }

  async handle(req, res, next) {
    await next()
  }

}

module.exports = TetraMiddleware
