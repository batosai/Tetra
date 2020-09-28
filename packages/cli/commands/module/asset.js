const { event } = require('@tetrajs/core')
const { Command } = require('../../')
const { ModuleService } = require('../../services')

module.exports = class Asset extends Command {
  configure() {
    this.name = 'assets'
    this.description = 'Install assets tetra module'

    return super.configure()
  }

  syntax() {
    console.log(
      this.kleur.green(`tetra <options> ${this.name} [module1 module2]`),
    )
  }

  async execute(args=[]) {
    await ModuleService.assetsInstall(args)

    event.emit(`tetra:cmd:${this.name}`)
  }
}
