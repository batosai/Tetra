const { Command } = require('../..')

module.exports = class Model extends Command {
  configure() {
    this.name = 'database:model'
    this.alias = 'db:model'

    return super.configure()
  }

  async execute() {
  }
}
