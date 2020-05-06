const Command = require('../../lib/command')

module.exports = class Model extends Command {
  configure() {
    this.name = 'database:model'
    this.alias = 'db:model'

    return super.configure()
  }

  async execute({ env }) {
    console.log('model ' + env)
  }
}
