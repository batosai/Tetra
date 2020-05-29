const { database } = require('@tetrajs/core')
const { Command } = require('../../')
const { ModuleService } = require('../../services')

module.exports = class Unlink extends Command {
  configure() {
    this.name = 'unlink'

    return super.configure()
  }

  execute(modules) {
    modules.args.map(async module => {
      try {
        await ModuleService.delete({ name: module })
      } catch (error) {
        database.mongoose.connection.close(true)
      }
    })
  }
}
