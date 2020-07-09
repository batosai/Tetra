const { cache } = require('../')
const path = require('path')
const { promisify } = require('util')
const glob = require('glob')

const globSync = promisify(glob)

module.exports = class WebpacksService {
  static get cacheName() {
    return 'entrypoints'
  }

  static async get() {
    if (await cache.exist(WebpacksService.cacheName)) {
      return await cache.get(WebpacksService.cacheName, JSON.parse)
    } else {
      return WebpacksService.caching()
    }
  }

  static async caching() {
    const entrypoint = {}
    const results = await globSync(`${process.cwd()}/public/**/manifest.json`)

    for (const ep of results) {
      entrypoint[path.basename(path.join(ep, '../'))] = require(ep)
    }

    cache.set(WebpacksService.cacheName, JSON.stringify(entrypoint))

    return entrypoint
  }
}
