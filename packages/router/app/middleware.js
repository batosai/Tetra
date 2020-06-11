const capitalize = require('./utils').capitalize
const parseParameters = require('./utils').parseParameters

const generatePrefix = (name, path) => {
  if (name !== 'root') {
    return `${name}${capitalize(path)}`
  }
  return path
}

module.exports = (namespaces) => {
  return (req, res, next) => {
    for (let name in namespaces) {
      namespaces[name].forEach((route) => {
        let prefix = ''
        prefix = generatePrefix(
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
    next()
  }
}
