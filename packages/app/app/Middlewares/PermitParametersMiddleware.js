const TetraMiddleware = require('@tetrajs/router').TetraMiddleware

class PermitParametersMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    req.permitParameters = (permit, query, blank = true) => {
      let params = {}

      for (const key of permit) {
        if (query[key] !== undefined) {
          if (blank) {
            params[key] = query[key]
          } else {
            if (query[key] !== '') {
              params[key] = query[key]
            }
          }
        }
      }

      return params
    }

    await next()
  }
}

module.exports = PermitParametersMiddleware
