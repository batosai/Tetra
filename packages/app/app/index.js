const path = require('path')
const { express } = require('@tetrajs/core')
const { fetchIn } = require('@tetrajs/core/lib/utils')
const router = require('@tetrajs/router').router

const mod = require('../helpers/module')

class App {
  #app
  #name
  #dirname
  #package

  constructor(dirname) {
    this.#app = express()
    this.#dirname = dirname

    this.#name = path.basename(this.#dirname)

    this.#app.set('name', this.#name)

    this.#package = require(path.join(this.#dirname, 'package.json'))

    this.#app.set('views', [path.join(this.#dirname, 'resources/views')])
    this.#app.set('view engine', 'pug')
    this.#app.locals.basedir = path.join(this.#dirname, 'resources/views');

    this.execute()
  }

  execute() {}

  use(...args) {
    this.#app.use(...args)
  }

  set(name, value) {
    this.#app.set(name, value)
  }

  export() {
    ;(async () => {
      // Load Middlewares
      await this.#middlewares()

      // Load Controllers
      await this.#controllers()
    })()

    // event.emit(`tetra:${this.name}:init`)
    return this.#app
  }

  // Private method

  async #middlewares() {
    const middlewares = await mod(this.#package.name).middlewares

    if (middlewares) {
      Object.values(middlewares).forEach(middleware => {
        try {
          const Klass = require(middleware)

          if (!('global' in Klass) && Klass.autoload) {
            this.use(Klass.handle)
          }
        } catch (e) {}
      })
    }
  }

  async #controllers() {
    const files = await fetchIn(`${path.join(this.#dirname, 'app/Controllers')}/**/*Controller.js`)
    const controllers = {}
    try {
      for (const file of files) {
        controllers[path.basename(file, '.js')] = require(file)
      }
    } catch (e) {}

    // Load Controllers
    this.use(
      '/',
      router.configure({
        path: path.join(this.#dirname, '.'),
        routes: require(`${this.#dirname}/config/routes`),
        controllers,
      }),
    )
  }
}

module.exports = App
