const TetraController = require('@tetrajs/router').TetraController
const RequireAuthentication = require('@tetrajs/auth-ui/app/Middlewares/RequireAuthentication')
const { security } = require('@tetrajs/core')
const { SitesService } = require('../Services')

module.exports = class ApplicationController extends TetraController {
  constructor(...args) {
    super(...args)

    const requireAuthentication = new RequireAuthentication()

    this.middlewares = [
      {
        actions: [
          requireAuthentication.handle,
          security.csrf.protection,
          security.csrf.token,
          this.setSite,
          this.setLocale,
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
