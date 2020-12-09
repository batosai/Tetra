const colors = require('colors')
// const spawn = require('cross-spawn')
const { spawn } = require('child_process')

module.exports = function install(
  root,
  dependencies = null,
  { useYarn, isOnline },
) {
  return new Promise((resolve, reject) => {
    let command
    let args
    if (useYarn) {
      command = 'yarnpkg'
      args = dependencies ? ['add', '--exact'] : ['install']
      if (!isOnline) {
        args.push('--offline')
      }
      if (dependencies) {
        args.push(...dependencies)
      }
      args.push('--cwd', root)

      // if (!isOnline) {
      //   console.log(colors.yellow('You appear to be offline.'))
      //   console.log(colors.yellow('Falling back to the local Yarn cache.'))
      //   console.log()
      // }
    } else {
      command = 'npm'
      args = [
        'install',
        '--prefix',
        root,
        dependencies && '--save',
        dependencies && '--save-exact',
        '--no-progress',
        '--loglevel',
        'error',
      ].concat(dependencies || [])
      //.concat(['&>', '/dev/null'])
    }

    const child = spawn(command, args)
    child.on('close', (code) => {
      // if (code !== 0) {
      //   console.log(`${command} ${args.join(' ')} ${code}`)
      //   reject({ command: `${command} ${args.join(' ')}` })
      //   return
      // }
      resolve()
    })
  })
}
