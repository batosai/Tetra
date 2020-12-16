
const { parseParameters, generatePrefix } = require('../../lib/utils')
const { capitalize } = require('@tetrajs/core').utils

class ResourcesService {
  static async handle(namespaces, { req, res }) {
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
  }
}

module.exports = ResourcesService
