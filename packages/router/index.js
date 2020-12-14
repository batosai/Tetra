const createError = require('http-errors')
const express = require('@tetrajs/core').express
const { capitalize } = require('@tetrajs/core').utils

const app = {
  configure:  function (config, fn) {
    const router = express.Router()

    router.all('*', async function (req, res, next) {
      // Change method HTTP by parameters _method
      if (req.body._method) req.method = req.body._method
      next()
    })

    const controllers = config.controllers

    for (let name in config.routes) {
      config.routes[name].forEach(route => {
        if (controllers[`${capitalize(route.name)}Controller`] !== undefined) {
          const controller = new controllers[`${capitalize(route.name)}Controller`]()

          if (controller.wildcard !== undefined)
            router.all('*', controller.wildcard)

          // console.log(route.route)
          router[route.method](
            route.route,
            controller.middlewaresToArray(route.action),
            controller[route.action],
          )
        }
      })
    }

    // catch 404 and forward to error handler
    router.use(async function (req, res, next) {
      next(createError(404))
    })

    // error handler
    router.use(async function (err, req, res, next) {
      console.log(err)
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      // render the error page
      res.status(err.status || 500)
      res.render('error')
    })

    // console.log(app._router.stack)
    // console.log(router.stack)

    return router
  }
}

module.exports.router = app

module.exports.get = require('./lib/method').get
module.exports.post = require('./lib/method').post
module.exports.put = require('./lib/method').put
module.exports.remove = require('./lib/method').remove

module.exports.resources = require('./lib/resources')
module.exports.root = require('./lib/root')
module.exports.namespace = require('./lib/namespace')

module.exports.TetraController = require('./app/Controllers/TetraController')
module.exports.TetraMiddleware = require('./app/Middlewares/TetraMiddleware')
