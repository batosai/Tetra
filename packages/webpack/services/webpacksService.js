const { cache, services } = require('@tetrajs/core')
const { ModulesService } = services

module.exports = class WebpacksService {
  static get cacheName() {
    return 'webpack'
  }

  static async get() {
    if (await cache.exist(WebpacksService.cacheName)) {
      return await cache.get(WebpacksService.cacheName, JSON.parse)
    } else {
      return WebpacksService.caching()
    }
  }

  static async caching() {
    const mds = await ModulesService.get()

    const configPath = []
    for (const key in mds) {
      try {
        if (require(`${mds[key]}/app/config/webpack`)) {
          configPath.push(`${mds[key]}/app/config/webpack`)
        }
      } catch (e) {}
    }

    cache.set(WebpacksService.cacheName, JSON.stringify(configPath))

    return configPath
  }
}
