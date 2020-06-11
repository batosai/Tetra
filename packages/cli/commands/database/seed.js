const { Command } = require('../..')

module.exports = class Seed extends Command {
  configure() {
    this.name = 'database:seed'
    this.alias = 'db:seed'

    return super.configure()
  }

  async execute() {}
}
