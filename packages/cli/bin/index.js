#!/usr/bin/env node

'use strict'

const argv = require('minimist')(process.argv.slice(2))
const { Command } = require('../')
const program = new Command()
let cmds = [
  require('../app/Commands/Console'),
  require('../app/Commands/Informations'),
  require('../app/Commands/Setup'),
  require('../app/Commands/Cache/Clear'),
  require('../app/Commands/Module/Install'),
  require('../app/Commands/Module/Remove'),
  require('../app/Commands/Module/Link'),
  require('../app/Commands/Module/Unlink'),
  require('../app/Commands/Module/List'),
  require('../app/Commands/Module/Asset'),
  require('../app/Commands/Database/Model'),
  require('../app/Commands/Database/Reset'),
  require('../app/Commands/Database/Seed'),
]

// Load commands modules installed
const { services } = require('@tetrajs/core')


;(async () => {
  const mds = await services.ModulesService.get()

  for (const key in mds) {
    try {
      const commands = require(`${mds[key].path}/app/Commands`)
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

})()
