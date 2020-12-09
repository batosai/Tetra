const TetraMiddleware = require('./TetraMiddleware')
const { capitalize, parseParameters, generatePrefix } = require('../../lib/utils')

const { services } = require('@tetrajs/core')
const { RoutesService } = services

class RouteMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    const routesCollection = await RoutesService.get()
    routesCollection.forEach(namespaces => {

      for (let name in namespaces) {
        namespaces[name].forEach((route) => {
          const prefix = generatePrefix(
            name,
            `${route.action}${capitalize(route.name)}`,
          )

          const r = name !== 'root' ? `/${name}${route.route}` : route.route

          req[`${prefix}Path`] = res.locals[`${prefix}Path`] = (opts) =>
            parseParameters(r, opts)

          req[`${prefix}Url`] = res.locals[`${prefix}Url`] = (opts) =>
            `${req.protocol}://${req.headers.host}${parseParameters(r, opts)}`

          req[`${prefix}View`] = route.defaultView
        })
      }

    })
    await next()
  }

}

module.exports = RouteMiddleware
