const defaultView = require('./utils').defaultView
const slugify = require('slugify')

module.exports = (name, sources) => {
  const r = {}
  const routes = []
  const basePath = '/'
  const baseViewPath = name !== '/' ? `${name}/` : ''

  let resources = []
  sources.forEach(r => {
    if (Array.isArray(r)) {
      for (let resource of r) {
        resources.push(resource)
      }
    } else {
      resources.push(r)
    }
  })

  for (let resource of resources) {
    routes.push({
      ...resource,
      route: `${basePath}${resource.route}`,
      defaultView: resource.defaultView
        ? defaultView(`${baseViewPath}${resource.defaultView}`)
        : null,
    })
  }

  r[slugify(name) !== '' ? slugify(name) : 'root'] = routes
  return r
}
