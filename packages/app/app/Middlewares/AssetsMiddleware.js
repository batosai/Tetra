const TetraMiddleware = require('@tetrajs/router').TetraMiddleware

class AssetsMiddleware extends TetraMiddleware {
  get externalModule() {
    return true
  }

  async handle(req, res, next) {
    const base = 'build'

    const name = req.app.get('name')
    const entrypoint = require(`${process.cwd()}/public/${base}/${name}/manifest.json`)

    res.locals.assets = function(file) {
      if (
        typeof entrypoint !== 'undefined' &&
        typeof entrypoint[file] !== 'undefined'
      ) {
        return `/${base}/${name}/${entrypoint[file]}`
      }
      return null
    }

    await next()
  }
}

module.exports = AssetsMiddleware
