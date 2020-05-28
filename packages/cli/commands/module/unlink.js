const { database } = require('@tetrajs/core')
const Command = require('../../lib/command')
const { ModuleService } = require('../../services')

module.exports = class Unlink extends Command {
  configure() {
    this.name = 'module:unlink'
    this.alias = 'm:ul'

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
