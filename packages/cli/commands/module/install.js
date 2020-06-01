const { database } = require('@tetrajs/core')
const { Command, pkgi } = require('../../')
const { ModuleService } = require('../../services')

module.exports = class Install extends Command {
  configure() {
    this.name = 'install'
    this.alias = 'i'
    this.description = 'Install tetra module'

    return super.configure()
  }

  syntax() {
    console.log(this.chalk.green(`tetra <options> ${this.name} [module1 module2]`))
  }

  execute(modules) {
    modules.map(async module => {
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
