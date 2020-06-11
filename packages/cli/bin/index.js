#!/usr/bin/env node

'use strict'

const argv = require('minimist')(process.argv.slice(2))
const { Command } = require('../')
const program = new Command()
let cmds = [
  require('../commands/console'),
  require('../commands/informations'),
  require('../commands/setup'),
  require('../commands/cache/clear'),
  require('../commands/module/install'),
  require('../commands/module/remove'),
  require('../commands/module/link'),
  require('../commands/module/unlink'),
  require('../commands/module/list'),
  require('../commands/database/model'),
  require('../commands/database/reset'),
  require('../commands/database/seed'),
]

// Load commands modules installed
const apppkg = require(`${process.cwd()}/package.json`)

for (let i in apppkg.dependencies) {
  try {
    const commands = require(`${apppkg.dependencies[i]}/commands`)
    for (let key in commands) {
      if (commands.hasOwnProperty(key)) {
        cmds.push(commands[key])
      }
    }
  } catch (e) {}
}

//
program.configure()
cmds.map((klass) => {
  const cmd = new klass()
  program.addCommand(cmd.configure())
})

if (!argv._.length) {
  program.render()
} else {
  const modules = argv._
  delete argv._
  program.execute(modules, argv)
}
