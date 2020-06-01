const { Command } = require('../..')

module.exports = class Reset extends Command {
  configure() {
    this.name = 'database:reset'
    this.alias = 'db:reset'

    return super.configure()
  }

  async execute() {
  }
}
