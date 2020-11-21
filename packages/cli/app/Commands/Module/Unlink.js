const { database, event, cache } = require('@tetrajs/core')
const { Command } = require('../../..')
const { ModuleService } = require('../../Services')

class Unlink extends Command {
  configure() {
    this.name = 'unlink'
    this.description = 'Unlink tetra module'

    return super.configure()
  }

  syntax() {
    console.log(
      this.kleur.green(`tetra <options> ${this.name} [module1 module2]`),
    )
  }

  execute(args) {
    args.map(async (module) => {
      try {
        cache.clear('modules')
        await ModuleService.delete({ name: module })

        event.emit(`tetra:cmd:${this.name}`, module)
      } catch (error) {
        database.mongoose.connection.close(true)
      }
    })
  }
}

module.exports = Unlink
