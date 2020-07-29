const BaseController = require('@tetra/router').baseController
const { requireAuthentication } = require('../middlewares')
const { security } = require('@tetra/core')
const { SitesService } = require('../services')

module.exports = class ApplicationController extends BaseController {
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
