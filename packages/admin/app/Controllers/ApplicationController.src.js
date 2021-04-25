const { Controller } = require('@tetrajs/router').decorators
const { security, middleware } = require('@tetrajs/core')
const { SitesService } = require('../Services')

// Todo ne pas faire de .src garder en build mais lors de l'ecriture du .build search and replace require *Controller.js by *Controller.js.build

@Controller()
class ApplicationController {
  constructor() {
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

  // @Action()
  // @Action({ type: 'json' })
  // @Request()
  // @Response()
  // @Next()
  // @Json()
  // @Xml()
  // @Stream()
  // @Html()
  // async create(req, res, next) {

  // }

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

module.exports = ApplicationController
