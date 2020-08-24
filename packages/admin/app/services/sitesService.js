const { Site } = require('@tetrajs/core').models

module.exports = class SitesService {
  static async findOne() {
    return await Site.findOne({})
  }

  static async updateSite(req) {
    const site = req.site
    site.set(req.body.site)

    return site
  }
}
