const TetraMiddleware = require('./TetraMiddleware')
const RouteService = require('../Services/RouteService')

const { services } = require('@tetrajs/core')
const { RoutesService } = services

class RouteMiddleware extends TetraMiddleware {
  get globalAccess() {
    return true
  }

  async handle(req, res, next) {
    const routesCollection = await RoutesService.get()
    routesCollection.forEach(namespaces => {
      RouteService.handle(namespaces, { req, res })
    })
    await next()
  }

}

module.exports = RouteMiddleware
