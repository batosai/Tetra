const createError = require('http-errors')
// const middleware = require('./app/middleware')
const express = require('@tetrajs/core').express

const app = {}

app.configure = function (config, fn) {
  const router = express.Router()
  // router.use(middleware(config.routes))

  const controllers = config.controllers

  router.all('*', async function (req, res, next) {
    // Change method HTTP by parameters _method
    if (req.body._method) req.method = req.body._method
    next()
  })

  for (let name in config.routes) {
    config.routes[name].forEach((route) => {
      if (controllers[`${route.name}Controller`] !== undefined) {
        const controller = new controllers[`${route.name}Controller`]()

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

module.exports.router = app

module.exports.get = require('./app/method').get
module.exports.post = require('./app/method').post
module.exports.put = require('./app/method').put
module.exports.remove = require('./app/method').remove

module.exports.resources = require('./app/resources')
module.exports.root = require('./app/root')
module.exports.namespace = require('./app/namespace')

module.exports.baseController = require('./app/baseController')
