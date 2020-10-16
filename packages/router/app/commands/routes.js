const path = require('path')
const { services } = require('@tetrajs/core')

const { RoutesService } = services

module.exports = class Routes extends Command {
  configure() {
    this.name = 'routes'
    this.description = 'Routes app'
    this.app = { path: process.cwd() }

    return super.configure()
  }

  async execute(args) {
    const routes = await RoutesService.get()

    // for (const k in mds) {
    //   if (mds[k].namespace) {
    //     app.use(mds[k].namespace, require(mds[k].path))
    //   }
    // }
  }
}
