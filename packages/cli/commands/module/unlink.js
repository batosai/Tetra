const { database } = require('@tetrajs/core')
const { Command } = require('../../')
const { ModuleService } = require('../../services')

module.exports = class Unlink extends Command {
  configure() {
    this.name = 'unlink'
    this.description = 'Unlink tetra module'

    return super.configure()
  }

  syntax() {
    console.log(this.chalk.green(`tetra <options> ${this.name} [module1 module2]`))
  }

  execute(modules) {
    modules.map(async module => {
      try {
        await ModuleService.delete({ name: module })
      } catch (error) {
        database.mongoose.connection.close(true)
      }
    })
  }
}
