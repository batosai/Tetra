#!/usr/bin/env node

'use strict'

const { commander, prompts, chalk } = require('./lib')
const pkg = require('./package.json')
const program = new commander.Command()
const modules = [
  './commands/install',
  './commands/db/config',
  './commands/db/model',
  './commands/db/reset',
  './commands/db/seed',
]

modules.map(module => {
  const klass = require(module)
  const cmd = new klass(commander, prompts, chalk)
  program.addCommand(cmd.configure())
})

program
  .version(pkg.version)
  .description(pkg.description)
  .parse(process.argv);
