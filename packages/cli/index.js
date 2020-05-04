#!/usr/bin/env node

'use strict'

const { program, chalk } = require('./lib')

const modules = [
  './commands/install',
  './commands/db/setup',
  './commands/db/model',
  './commands/db/reset',
  './commands/db/seed',
]
const defaultOptions = [
  ['-e, --env <env>', 'set environment', 'development']
]

program
  .option(defaultOptions[0][0], defaultOptions[0][1], defaultOptions[0][2] || null)

modules.map(module => {
  const m = require(module)
  if (!m.name || !m.action) return

  const p = program
    .command(m.name)
    .description(m.description || null)
    .alias(m.alias || null)
    .action(m.action)
    .addHelpCommand(`${chalk.green(m.name)}`, m.description || null);

  const options = m.options ? [ ...defaultOptions, ...m.options ] : [ ...defaultOptions ]
  options.map(opt => {
    p.option(opt[0], opt[1], opt[2] || null)
  })
})

program.parse(process.argv)
