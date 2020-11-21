const { Command } = require('../../..')

class Seed extends Command {
  configure() {
    this.name = 'database:seed'
    this.alias = 'db:seed'

    return super.configure()
  }

  async execute() {}
}

module.exports = Seed
