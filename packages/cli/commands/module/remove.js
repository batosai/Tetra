const { database } = require('@tetrajs/core')
const { Command, pkgrm } = require('../../lib')
const { ModuleService } = require('../../services')

module.exports = class Remove extends Command {
  configure() {
    this.name = 'module:remove'
    this.alias = 'm:rm'

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
