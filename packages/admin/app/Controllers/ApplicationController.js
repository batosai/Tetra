const TetraController = require('@tetrajs/router').TetraController
const { requireAuthentication } = require('../middlewares')
const { security } = require('@tetrajs/core')
const { SitesService } = require('../Services')

module.exports = class ApplicationController extends TetraController {
  constructor(...args) {
    super(...args)

    this.middlewares = [
      {
        actions: [
          requireAuthentication,
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
    next()
  }

  async setLocale(req, res, next) {
    if (
      req.query['lang'] === undefined &&
      req.cookies['language'] === undefined
    ) {
      const site = await SitesService.findOne()
      res.setLocale(site.language)
    }
    next()
  }
}
