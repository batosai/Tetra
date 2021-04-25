const TetraController = require('@tetrajs/router').TetraController
const { middleware } = require('@tetrajs/app')
const { security } = require('@tetrajs/core')
const { SitesService } = require('../Services')

module.exports = class ApplicationController extends TetraController {
  constructor() {
    super()

    this.middlewares = [
      {
        actions: [
          middleware('require-authentication'),
          security.csrf.protection,
          security.csrf.token,
          this.setSite,
          this.setLocale,
          middleware('assets')
        ],
      },
    ]
  }

  async setSite(req, res, next) {
    const site = await SitesService.findOne()
    res.locals.site = site
    req.site = site
    await next()
  }

  async setLocale(req, res, next) {

    if (
      req.query['lang'] === undefined &&
      req.cookies['language'] === undefined
    ) {
      const site = await SitesService.findOne()
      res.setLocale(site.language)
    }
    await next()
  }
}
