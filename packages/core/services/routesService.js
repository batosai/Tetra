const { cache } = require('..')
const ModulesService = require('./modulesService')


module.exports = class RoutesService {
  static get cacheName() {
    return 'routers'
  }

  static async get() {
    if (await cache.exist(RoutesService.cacheName)) {
      return await cache.get(RoutesService.cacheName, JSON.parse)
    } else {
      return RoutesService.caching()
    }
  }

  static async caching() {
    const modules = await ModulesService.get()
    let routers = []

    for (const key in modules) {
      try {
        const routes = require(`${modules[key].path}/app/config/routes.js`)
        routers = [...routers, routes]
      } catch(e) {}
    }
    cache.set(RoutesService.cacheName, JSON.stringify(routers))

    return routers
  }
}
