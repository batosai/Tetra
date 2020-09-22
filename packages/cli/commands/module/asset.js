const path = require('path')
const { spawn } = require('child_process')
const { services, utils } = require('@tetrajs/core')
const { Command } = require('../../')
const { exist } = utils

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
    try {
      const modules = await services.ModulesService.get()

      for (const k in modules) {
        const m = modules[k]

        if (args.length === 0 || args.indexOf(m.packageName) !== -1) {
          const src = path.join(m.path, 'public/build', m.name)
          const dst = path.join(process.cwd(), 'public/build', m.name)
          const present = await exist(src)
          const presentDest = await exist(dst)

          if (present && !presentDest) {
            await spawn('cp', ['-r', src, dst])
          }
        }
      }
    } catch (error) {}
  }
}
