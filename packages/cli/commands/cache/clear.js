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

  execute(args) {
    if (args.length) {
      for (const name of args) {
        cache.clear(name)
      }
      return
    }
    return cache.clear()
  }
}
