#!/usr/bin/env node

'use strict'

const { Command } = require('commander')
const chalk = require('chalk')

const packageJson = require('./package.json')

let cmdValue, optionsValue

const program = new Command('npx tetrajs')
  .version(packageJson.version, '-v, --version', 'output the current version')
  .arguments('<command> [options]')
  .usage(`${chalk.green('<command>')} [options]`)
  .action((cmd, opt) => {
    cmdValue = cmd
    optionsValue = opt
  })
  .option('-i, --info', 'print environment debug info')
  .allowUnknownOption()
  .on('--help', () => {
    console.log('')
    console.log('Commands:')
    console.log('  i, install     first install app')
    console.log('  db:reset, database:reset   reset database')
    console.log('  db:seed, database:seed     action in database')
    console.log('  db:model, database:model   action in database')
  })
  .parse(process.argv)

if (program.info) {
  console.log(chalk.bold('\nEnvironment Info:'))
  console.log(
    `\n  current version of ${packageJson.name}: ${packageJson.version}`
  )
  console.log(`  running from ${__dirname}`)
  process.exit()
}

switch (cmdValue) {
  case 'i':
  case 'install':
    require('./cmd/install')
    break
  case 'db:reset':
  case 'database:reset':
    require('./cmd/db/reset')
    break
  case 'db:seed':
  case 'database:seed':
    require('./cmd/db/seed')
    break
  case 'db:model':
  case 'database:model':
    require('./cmd/db/model')
    break
  default:
    program.help();
}
