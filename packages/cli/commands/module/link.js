const { database } = require('@tetrajs/core')
const Command = require('../../lib/command')
const { ModuleService } = require('../../services')

module.exports = class Link extends Command {
  configure() {
    this.name = 'module:link'
    this.alias = 'm:l'

    return super.configure()
  }

  execute(modules) {
    modules.args.map(async module => {
      try {
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
