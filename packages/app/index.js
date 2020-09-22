const path = require('path')
const { express, services, event } = require('@tetrajs/core')
const router = require('@tetrajs/router').router

const { MiddlewaresService } = services

module.exports = class App {
  constructor(dirname) {
    this.app = express()
    this.dirname = dirname
    this.name = path.basename(path.join(this.dirname, '../'))

    this.app.set('name', this.name)

    this.app.set('views', [path.join(this.dirname, 'views')])
    this.app.set('view engine', 'pug')
    this.app.locals.basedir = path.join(this.dirname, 'views');

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
        this.app.use(require(mws[key]))
      }

      // Load Controllers
      this.app.use(
        '/',
        router.configure({
          routes: require(`${this.dirname}/config/routes`),
          controllers: require(`${this.dirname}/controllers`),
        }),
      )
    })()

    event.emit(`tetra:${this.name}:init`)
    return this.app
  }
}
