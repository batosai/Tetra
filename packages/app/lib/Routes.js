const Cache = require('./Cache')
const Modules = require('./Modules')

class Routes extends Cache{
  static async caching() {
    const modules = await Modules.fetch()
    let routers = []

    for (const key in modules) {
      try {
        const routes = require(`${modules[key].path}/config/routes.js`)
        routers = [...routers, routes]
      } catch(e) {}
    }

    this.data = routers

    return await super.caching()
  }
}

module.exports = Routes
