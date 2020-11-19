const ApplicationController = require('./ApplicationController')
const { SitesService } = require('../services')

module.exports = class SettingsController extends ApplicationController {
  async index(req, res, next) {
    res.render(req.adminIndexSettingsView, { title: 'Settings', errors: {} })
  }

  async update(req, res, next) {
    const site = await SitesService.updateSite(req)

    const promise = site.save()

    promise.then(() => res.redirect(req.adminIndexSettingsPath()))
    promise.catch(err =>
      res.render(req.adminIndexSettingsView, {
        title: 'Settings',
        site,
        errors: err.errors,
      }),
    )
  }
}
