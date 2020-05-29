const { database } = require('@tetrajs/core')
const { Command, pkgrm } = require('../../')
const { ModuleService } = require('../../services')

module.exports = class Remove extends Command {
  configure() {
    this.name = 'uninstall'
    this.alias = 'remove'

    return super.configure()
  }

  execute(modules) {
    modules.args.map(async module => {
      try {
        await pkgrm(module)

        await ModuleService.delete({ name: module })
      } catch (error) {
        database.mongoose.connection.close(true)
      }
    })
  }
}
