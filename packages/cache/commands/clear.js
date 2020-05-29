const { Command } = require('@tetrajs/cli')
const cache = require('..')

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
