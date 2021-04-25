const { Middleware } = require('../Decorators')
const ResourcesService = require('../Services/ResourcesService')

const { Routes } = require('@tetrajs/app')

@Middleware('route')
class RouteMiddleware {
  static global

  static async handle(req, res, next) {
    const routesCollection = await Routes.fetch()
    routesCollection.forEach(namespaces => {
      ResourcesService.handle(namespaces, { req, res })
    })
    await next()
  }

}

module.exports = RouteMiddleware
