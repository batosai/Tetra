const { cache } = require('../')
const path = require('path')
const { promisify } = require('util')
const glob = require('glob')
const ModulesService = require('./modulesService')

const globSync = promisify(glob)

module.exports = class MiddlewaresService {
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
    const modules = await ModulesService.get()
    modules['core'] = path.join(__dirname, '../')
    let middlewares = []

    for (const key in modules) {
      const results = await globSync(`${modules[key]}/middlewares/**/*.js`, {ignore: 'index.js'})
      middlewares = [...middlewares, ...results]
    }
    cache.set(MiddlewaresService.cacheName, JSON.stringify(middlewares))

    return middlewares
  }
}
