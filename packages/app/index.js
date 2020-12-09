const path = require('path')
const { express, services, event } = require('@tetrajs/core')
const { fetchFiles, fetchFilesInModules } = require('@tetrajs/core/lib/utils')
const router = require('@tetrajs/router').router

const { MiddlewaresService } = services

module.exports = class App {
  constructor(dirname) {
    this.app = express()
    this.dirname = dirname
    this.name = path.basename(this.dirname)

    this.app.set('name', this.name)

    this.app.set('views', [path.join(this.dirname, 'resources/views')])
    this.app.set('view engine', 'pug')
    this.app.locals.basedir = path.join(this.dirname, 'resources/views');

    this.execute()
  }

  execute() {}

  use(middleware) {
    this.app.use(middleware)
  }

  set(name, value) {
    this.app.set(name, value)
  }

  export() {
    ;(async () => {
      // Load Middlewares
      const mws = await MiddlewaresService.get()

      for (const key in mws) {
        try {
          const klass = require(mws[key])
          const o = new klass()
          if (!o.globalAccess && o.externalModule && o.autoLoad) {
            this.app.use(o.handle)
          }
        } catch (e) {}
      }

      const middlewareFiles = await fetchFiles(`${path.join(this.dirname, 'app/Middlewares')}/**/*.js`)
      try {
        for (const f of middlewareFiles) {
          const klass = require(f)
          const o = new klass()
          if (!o.globalAccess && o.autoLoad) {
            this.app.use(o.handle)
          }
        }
      } catch (e) {}

      const files = await fetchFiles(`${path.join(this.dirname, 'app/Controllers')}/**/*Controller.js`)
      let controllers = {}
      try {
        for (const file of files) {
          controllers[path.basename(file, '.js')] = require(file)
        }
      } catch (e) {}

      // Load Controllers
      this.app.use(
        '/',
        router.configure({
          path: path.join(this.dirname, '.'),
          routes: require(`${this.dirname}/config/routes`),
          controllers,
        }),
      )
    })()

    event.emit(`tetra:${this.name}:init`)
    return this.app
  }
}
