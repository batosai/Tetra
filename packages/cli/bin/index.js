#!/usr/bin/env node

'use strict'

const { commander, prompts, chalk } = require('../')
const pkg = require('../package.json')
const program = new commander.Command()
let cmds = [
  require('../commands/informations'),
  require('../commands/setup'),
  require('../commands/module/install'),
  require('../commands/module/remove'),
  require('../commands/module/link'),
  require('../commands/module/unlink'),
  require('../commands/database/model'),
  require('../commands/database/reset'),
  require('../commands/database/seed'),
]

const apppkg = require(`${process.cwd()}/package.json`)

for (let m in apppkg.dependencies) {
  try {
    const commands = require(`${m}/commands`)
    for (let key in commands) {
        if (commands.hasOwnProperty(key)) {
          cmds.push(commands[key])
        }
    }
  } catch(e) {}
}

cmds.map((klass) => {
  const cmd = new klass(commander, prompts, chalk)
  program.addCommand(cmd.configure())
})

program.version(pkg.version).description(pkg.description).parse(process.argv)
