#!/usr/bin/env node

// const { prompts, chalk } = require('./')
// const commander = require('commander')
// const program = require('commander')

module.exports = class Command {
  constructor(commander, prompts, chalk) {
    this.commander = commander
    this.prompts = prompts
    this.chalk = chalk

    this.execute = this.execute.bind(this)
  }

  configure() {
    const program = new this.commander.Command(this.name)

    program
      // .command('[module]')
      .alias(this.alias || null)
      // .description(this.description || null)
      // .addHelpCommand(`${this.chalk.green(this.name)}`, this.description || null)
      .action(this.execute)
      .option('-e, --env <env>', 'set environment', 'development')
      // .parse(process.argv)
    return program
  }

  async execute(module, options) {}
}
