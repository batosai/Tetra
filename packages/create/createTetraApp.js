'use strict'

const chalk = require('chalk')
const { Command } = require('commander')
const spawn = require('cross-spawn')
const path = require('path')
const install = require('./lib/install')
const shouldUseYarn = require('./lib/shouldUseYarn')
const { envGenerator, packageGenerator } = require('./lib/generators')

const packageJson = require('./package.json')
const useYarn = shouldUseYarn()

let projectName

const pkgi = (pkg) => {
  console.log(`Installing ${chalk.cyan(pkg)}`)
  console.log()

  install(projectName, [pkg], { useYarn })
  console.log()
}

const program = new Command(packageJson.name)
  .version(packageJson.version, '-v, --version', 'output the current version')
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')}`)
  .action((name) => {
    projectName = name
  })
  .option('--skip-admin', 'skip administration install')
  .allowUnknownOption()
  .parse(process.argv)

if (typeof projectName === 'string') {
  console.log(`Creating a new Tetra app in ${chalk.green(projectName)}.`)
  console.log()

  spawn.sync(
    'cp',
    ['-r', path.join(__dirname, 'templates', 'default'), projectName],
    { stdio: 'inherit' },
  )

  envGenerator(projectName)
  envGenerator(projectName, 'test', '.env.test')
  packageGenerator(projectName)

  pkgi('@tetrajs/app')
  pkgi('@tetrajs/cache')
  pkgi('@tetrajs/auth-ui')

  // if (!program.skipAdmin) {
  //   pkgi('@tetrajs/admin')
  // }
}
