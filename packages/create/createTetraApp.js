'use strict'

const chalk = require('chalk')
const { Command } = require('commander')
const spawn = require('cross-spawn')
const envinfo = require('envinfo')
const fs = require('fs')
const path = require('path')
const os = require('os')
const install = require('./helpers/install')
const shouldUseYarn = require('./helpers/shouldUseYarn')

const packageJson = require('./package.json')
const useYarn = shouldUseYarn()

let projectName

const pkgi = pkg => {
  console.log(`Installing ${chalk.cyan(pkg)}`)
  console.log()

  install(projectName, [pkg], { useYarn })
  console.log()
}

const program = new Command(packageJson.name)
  .version(packageJson.version, '-v, --version', 'output the current version')
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')}`)
  .action(name => { projectName = name })
  .option('--skip-admin', 'skip administration install')
  .option('-i, --info', 'print environment debug info')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`  Only ${chalk.green('<project-directory>')} is required.`)
  })
  .parse(process.argv)

if (program.info) {
  console.log(chalk.bold('\nEnvironment Info:'))
  console.log(
    `\n  current version of ${packageJson.name}: ${packageJson.version}`
  )
  console.log(`  running from ${__dirname}`)
  return envinfo.run({
    System: ['OS', 'CPU'],
    Binaries: ['Node', 'npm', 'Yarn'],
    Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
    npmPackages: ['@tetrajs/app'],
  },
  {
    duplicates: true,
    showNotFound: true,
  }).then(console.log)
}

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:')
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  )
  console.log()
  console.log('For example:')
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-tetra-app')}`)
  console.log()
  console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`)
  process.exit(1)
}
else {
  console.log(`Creating a new Tetra app in ${chalk.green(projectName)}.`);
  console.log();

  spawn.sync('cp', ['-r', path.join(__dirname, 'templates', 'default'), projectName], { stdio: 'inherit' })

  const packageJson = {
    name: projectName,
    version: '1.0.0',
    private: true,
    scripts: { start: 'tetra start' },
  }
  fs.writeFileSync(
    path.join(projectName, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )

  pkgi('@tetrajs/app')

  // if (!program.skipAdmin) {
  //   pkgi('@tetrajs/admin')
  // }
}
