const { database, event, cache } = require('@tetrajs/core')
const { Command, pkgrm } = require('../../..')
const { ModuleService } = require('../../Services')

class Remove extends Command {
  configure() {
    this.name = 'remove'
    this.alias = 'rm'
    this.description = 'Remove tetra module'

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
        await pkgrm(module)
        cache.clear('modules')

        await ModuleService.delete({ name: module })

        event.emit(`tetra:cmd:${this.name}`, module)
      } catch (error) {
        database.mongoose.connection.close(true)
      }
    })
  }
}

module.exports = Remove
