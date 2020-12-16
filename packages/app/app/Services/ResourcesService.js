
const path = require('path')
const { services } = require('@tetrajs/core')
const router = require('@tetrajs/router').router
const { fetchFiles } = require('@tetrajs/core/lib/utils')

const { MiddlewaresService } = services

class ResourcesService {
  static async middlewares(scope) {
    const middlewareFiles = await fetchFiles(`${path.join(scope.dirname, 'app/Middlewares')}/**/*.js`)
    try {
      for (const f of middlewareFiles) {
        const klass = require(f)
        const o = new klass()
        if (!o.globalAccess && o.autoLoad) {
          scope.use(o.handle)
        }
      }
    } catch (e) {}
  }

  static async externalMiddlewares(scope) {
    const mws = await MiddlewaresService.get()

    for (const key in mws) {
      try {
        const klass = require(mws[key])
        const o = new klass()
        if (!o.globalAccess && o.externalModule && o.autoLoad) {
          scope.use(o.handle)
        }
      } catch (e) {}
    }
  }

  static async controllers(scope) {
    const files = await fetchFiles(`${path.join(scope.dirname, 'app/Controllers')}/**/*Controller.js`)
    const controllers = {}
    try {
      for (const file of files) {
        controllers[path.basename(file, '.js')] = require(file)
      }
    } catch (e) {}

    // Load Controllers
    scope.use(
      '/',
      router.configure({
        path: path.join(scope.dirname, '.'),
        routes: require(`${scope.dirname}/config/routes`),
        controllers,
      }),
    )
  }
}

module.exports = ResourcesService
