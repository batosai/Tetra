'use strict'

const path = require('path')
const { spawn } = require('child_process')
const colors = require('colors')
var argv = require('minimist')(process.argv.slice(2))
const install = require('./lib/install')
const shouldUseYarn = require('./lib/shouldUseYarn')
const { packageGenerator } = require('./lib/generators')
const { exist } = require('./lib/utils')
const Steps = require('./lib/steps')

const useYarn = shouldUseYarn()

const steps = new Steps(2)
steps.startRecording()
let oldStep = null

if (!argv._.length) {
  console.log()
  if (useYarn) {
    console.log(colors.green('yarn create @tetrajs [project-name]'))
  } else {
    console.log(colors.green('npm init @tetrajs [project-name]'))
  }
  console.log()
  console.log(colors.red('  Project name is require.'))
  process.exit()
}

const projectName = argv._[0]

console.log()
console.log(colors.green(`Creating a new Tetra app in ${projectName}.`))
console.log()

async function main() {
  const present = await exist(path.join('./', projectName))

  if (present) {
    console.log(colors.red('  Project is already exist.'))
    process.exit()
  }

  oldStep = steps.advance('Create project').start()
  await spawn('cp', [
    '-r',
    path.join(__dirname, 'templates', 'default'),
    projectName,
  ])
  await packageGenerator(projectName)
  oldStep.success('Create project', '✓')

  oldStep = steps.advance('Installing dependencies').start()
  await install(projectName, ['@tetrajs/app', '@tetrajs/router', '@tetrajs/webpack', '@tetrajs/auth-ui', '@tetrajs/admin'], { useYarn, isOnline: true })
  oldStep.success('Dependencies installed', '✓')

  process.chdir(projectName)

  const nanoSecs = steps.stopRecording()
  console.log('')
  console.log(`  ${colors.green('success')} Success`)
  console.log(`  ✨  Done in ${Math.round(nanoSecs / 1e9)}s.`)

  console.log()
  console.log('To get started, cd into the new directory:')
  console.log(`  ${colors.green(`cd ${projectName}`)}`)
  console.log()
  console.log('To configure app:')
  if (useYarn) {
    console.log(`  ${colors.green('yarn exec tetra setup')}`)
  } else {
    console.log(`  ${colors.green('npx tetra setup')}`)
  }
  console.log()
  console.log('To start a server:')
  if (useYarn) {
    console.log(`  ${colors.green('yarn exec tetra serve')}`)
  } else {
    console.log(`  ${colors.green('npx tetra serve')}`)
  }
  console.log()
}
main()
