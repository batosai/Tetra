
const { services } = require('@tetrajs/core')
const { fetchFilesInModules } = require('@tetrajs/core/lib/utils')

const { ModulesService, MiddlewaresService } = services

class Resources {
  static async middlewares(app) {
    const middlewares = await MiddlewaresService.get()

    for (const middleware of middlewares) {
      try {
        const klass = require(middleware)
        const o = new klass()
        if (o.globalAccess) {
          app.use(o.handle)
        }
      } catch (e) {}
    }
  }

  static async modules(app) {
    const modules = await ModulesService.get()

    for (const k in modules) {
      if (modules[k].namespace && modules[k].autoload) {
        app.use(modules[k].namespace, require(modules[k].path))
      }
    }
  }
}

module.exports = Resources
