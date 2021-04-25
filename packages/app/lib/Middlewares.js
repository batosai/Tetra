const Cache = require('./Cache')
const Modules = require('./Modules')

class Middlewares extends Cache {

  static async caching() {
    const modules = await Modules.fetch()
    let payload = []
    this.data = {}
    for (const k in modules) {
      payload = [ ...payload, ...modules[k].middlewares ]
    }

    for (const file of payload) {
      const basename = require(file).key
      this.data[basename] = file
    }

    return await super.caching()
  }
}

module.exports = Middlewares
