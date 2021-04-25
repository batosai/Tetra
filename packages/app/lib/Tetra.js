const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const i18n = require('i18n')
// const favicon = require('serve-favicon')
const Session = require('./Session')
const {
  express,
  auth
} = require('@tetrajs/core')

const { fetchIn } = require('@tetrajs/core/lib/file')

const Modules = require('./Modules')
const config = require('../config')

class Tetra {
  #app

  constructor() {
    this.#app = express()
  }

  configure() {
    this.#app.set('appPath', config.basePath)

    return this
  }

  use(...args) {
    this.#app.use(...args)
  }

  async initialize() {
    this.use(this.#logger())
    this.use(express.json())
    this.use(express.urlencoded({ extended: true }))
    this.use(cookieParser())
    this.use(Session.connect())
    this.use(express.static(path.join(config.basePath, 'public')))
    this.use(compression())
    this.use(helmet())
    this.use(auth.passport.initialize())
    this.use(auth.passport.session())

    await this.#i18n()
    await this.#middlewares()
    await this.#modules()

    return this
  }

  export() {
    return this.#app
  }

  // Private methods

  #logger() {
    // create a write stream (in append mode)
    const accessLogStream = fs.createWriteStream(
      path.join(config.basePath, 'var/log/access.log'),
      { flags: 'a' },
    )
    // TODO create a rotating write stream  https://github.com/expressjs/morgan
    return logger('combined', { stream: accessLogStream })
  }

  async #middlewares() {
    const modules = await Modules.fetch()

    for (const k in modules) {
      Object.values(modules[k].middlewares).forEach(middleware => {
        try {
          const Klass = require(middleware)

          if ('global' in Klass && Klass.autoload) {
            this.use(Klass.handle)
          }
        } catch (e) {}
      })
    }
  }

  async #modules() {
    const modules = await Modules.fetch()

    for (const k in modules) {
      if (modules[k].namespace && modules[k].autoload) {
        this.use(modules[k].namespace, require(modules[k].path))
      }
    }
  }

  async #i18n() {
    const modules = await Modules.fetch()
    const locales = []
    const staticCatalog = {}

    for (const k in modules) {
      try {
        const files = await fetchIn(`${path.join(modules[k].path, 'config/locales')}/**.json`)

        for (const file of files) {
          const parse = path.parse(file)
          locales.push(parse.name)

          const catalogue = require(file)
          if (staticCatalog[parse.name] === undefined) staticCatalog[parse.name] = {}
          staticCatalog[parse.name] = { ...staticCatalog[parse.name], ...catalogue }
        }

      } catch (e) {
        // log
      }
    }

    i18n.configure({
      locales,
      defaultLocale: config.app.locales.default,
      objectNotation: true,
      updateFiles: false,
      syncFiles: false,
      queryParameter: config.app.locales.queryParameter,
      cookie: config.app.locales.cookieName,
      register: this.#app,
      staticCatalog,
    })

    this.use(i18n.init)
  }
}

module.exports = Tetra
