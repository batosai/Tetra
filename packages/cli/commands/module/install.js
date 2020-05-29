const { database } = require('@tetrajs/core')
const { Command, pkgi } = require('../../')
const { ModuleService } = require('../../services')

module.exports = class Install extends Command {
  configure() {
    this.name = 'install'
    this.alias = 'i'

    return super.configure()
  }

  execute(modules) {
    modules.args.map(async module => {
      try {
        await pkgi(module)

        const pkg = require(`${module}/package.json`)

        await ModuleService.findOrCreate({ name: pkg.name }, {
          name: pkg.name,
          version: pkg.version,
        })
      } catch (error) {
        database.mongoose.connection.close(true)
      }
    })
  }
}
