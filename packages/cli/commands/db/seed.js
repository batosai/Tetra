const Command = require('../../lib/command')

module.exports = class Seed extends Command {
  configure() {
    this.name = 'database:seed'
    this.alias = 'db:seed'

    return super.configure()
  }

  async execute({ env }) {
    console.log(env)
  }
}
