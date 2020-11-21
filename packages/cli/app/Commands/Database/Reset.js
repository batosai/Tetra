const { Command } = require('../../..')

class Reset extends Command {
  configure() {
    this.name = 'database:reset'
    this.alias = 'db:reset'

    return super.configure()
  }

  async execute() {}
}

module.exports = Reset
