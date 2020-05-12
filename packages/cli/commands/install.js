const Command = require('../lib/command')

module.exports = class Install extends Command {
  configure() {
    this.name = 'install'
    this.alias = 'i'

    return super.configure()
  }

  execute({ env }) {
    console.log('install ' + env)
  }
}
