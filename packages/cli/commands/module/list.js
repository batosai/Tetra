const { Command } = require('../../')
const { ModuleService } = require('../../services')

module.exports = class List extends Command {
  configure() {
    this.name = 'list'
    this.description = 'List tetra modules'

    return super.configure()
  }

  async execute() {
    const table = this.table({ head: ['Modules', 'Version', 'Enabled'] })
    const modules = await ModuleService.fetchModules()
    modules.map((module) => {
      table.push([module.name, module.version, module.enabled])
    })

    console.log(table.toString())
  }
}
