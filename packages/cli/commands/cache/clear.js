const { Command } = require('../..')
const { cache } = require('@tetrajs/core')

module.exports = class Clear extends Command {
  configure() {
    this.name = 'cache:clear'
    this.alias = 'ca:c'

    const program = super.configure()
    program.option('-e, --env <env>', 'set environment', 'development')
    return program
  }

  execute() {
    cache.clear()
  }
}
