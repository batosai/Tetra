'use strict'

const path = require('path')
const { spawn } = require('child_process')
const colors = require('colors')
var argv = require('minimist')(process.argv.slice(2))
const install = require('./lib/install')
const shouldUseYarn = require('./lib/shouldUseYarn')
const { packageGenerator, envGenerator } = require('./lib/generators')
const Steps = require('./lib/steps')

const steps = new Steps(4)
steps.startRecording()
let oldStep = null

const useYarn = shouldUseYarn()

if (!argv._.length) {
  console.log(colors.red('Project name is require.'))
  process.exit()
}

const projectName = argv._[0]

console.log(colors.green('Creating a new Tetra app in projectName.'))
console.log()

async function main() {

  oldStep = steps.advance('Create project').start()
  await spawn(
    'cp',
    ['-r', path.join(__dirname, 'templates', 'default'), projectName],
    { stdio: 'inherit' },
  )
  await packageGenerator(projectName)
  await envGenerator(projectName)
  await envGenerator(projectName, {
    env: 'test',
    filename: '.env.test'
  })
  oldStep.success('Create project', '✓')

  oldStep = steps.advance('Installing dependencies').start()
    await install(projectName, ['@tetrajs/app', '@tetrajs/auth-ui'], { useYarn })
  oldStep.success('Dependencies installed', '✓')

  process.chdir(projectName)

  oldStep = steps.advance('Linking dependencies').start()
    const args = [ 'tetra', 'link']
      .concat(['@tetrajs/auth-ui'])

    await spawn(`npx`, args)
  oldStep.success('Dependencies linked', '✓')

  const nanoSecs = steps.stopRecording()
  console.log('')
  console.log(`  ${colors.green('success')} Success`)
  console.log(`  ✨  Done in ${Math.round(nanoSecs / (1e9))}s.`)
}
main()


// if (!argv['skip-admin']) {
//   pkgi('@tetrajs/admin')
// }
