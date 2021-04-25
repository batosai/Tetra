const os = require('os')
const c = require('@tetrajs/core/lib/cache')

class Cache {
  static data

  static async register(config={}) {
    if (!(await c.exist(this.name))) {
      await this.caching(config)
    }
  }

  static async fetch(config={}) {

    if (await c.exist(this.name)) {
      return c.get(this.name, JSON.parse)
    } else {
      return this.caching(config)
    }
  }

  static async caching(config={}) {
    await c.set(this.name, JSON.stringify(this.data, null, 2) + os.EOL)

    return this.data
  }
}

module.exports = Cache
