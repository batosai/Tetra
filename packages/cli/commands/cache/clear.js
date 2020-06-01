const { Command } = require('../..')
const { cache } = require('@tetrajs/core')

module.exports = class Clear extends Command {
  configure() {
    this.name = 'cache:clear'
    this.alias = 'ca:c'
    this.description = 'Clear cache'

    this.addOption('-e, --env <env>', 'Set environment', 'development')

    return super.configure()
  }

  execute() {
    return cache.clear()
  }
}
