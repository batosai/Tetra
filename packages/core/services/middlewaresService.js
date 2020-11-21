const { cache } = require('../')
const { fetchFilesInModules } = require('../lib/utils')

class MiddlewaresService {
  static get cacheName() {
    return 'middlewares'
  }

  static async get() {
    if (await cache.exist(MiddlewaresService.cacheName)) {
      return await cache.get(MiddlewaresService.cacheName, JSON.parse)
    } else {
      return MiddlewaresService.caching()
    }
  }

  static async caching() {
    const middlewares = await fetchFilesInModules('middlewares/**/*.js')
    cache.set(MiddlewaresService.cacheName, JSON.stringify(middlewares))

    return middlewares
  }
}

module.exports = MiddlewaresService
