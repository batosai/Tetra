const path = require('path')
const { express, event } = require('@tetrajs/core')
const ResourcesService = require('./Services/ResourcesService')

class App {
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

  use(...arg) {
    this.app.use(...arg)
  }

  set(name, value) {
    this.app.set(name, value)
  }

  export() {
    ;(async () => {
      // Load Middlewares
      await ResourcesService.middlewares(this)
      // Load external Middlewares
      await ResourcesService.externalMiddlewares(this)
      // Load Controllers
      await ResourcesService.controllers(this)
    })()

    // event.emit(`tetra:${this.name}:init`)
    return this.app
  }
}

module.exports = App
