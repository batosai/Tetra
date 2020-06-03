const kleur = require('kleur')
const spawn = require('cross-spawn')

const shouldUseYarn = require('./shouldUseYarn')

function pkg(
  type='install',
  root,
  dependencies = null,
  { useYarn, isOnline },
) {
  return new Promise((resolve, reject) => {
    let command
    let args
    if (useYarn) {
      type = type === 'install' ? 'add' : 'remove'
      command = 'yarnpkg'
      args = dependencies ? [type, '--exact'] : ['install']
      if (!isOnline) {
        args.push('--offline')
      }
      if (dependencies) {
        args.push(...dependencies)
      }
      args.push('--cwd', root)

      if (!isOnline) {
        console.log(kleur.yellow('You appear to be offline.'))
        console.log(kleur.yellow('Falling back to the local Yarn cache.'))
        console.log()
      }
    } else {
      command = 'npm'
      args = [
        type,
        '--prefix',
        root,
        dependencies && '--save',
        dependencies && '--save-exact',
        '--loglevel',
        'error',
      ].concat(dependencies || [])
    }

    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    })
    child.on('close', (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}` })
        return
      }
      resolve()
    })
  })
}

function install(root, dependencies = null, options) {
  return pkg(
    'install',
    root,
    dependencies,
    options
  )
}

function uninstall(root, dependencies = null, options) {
  return pkg(
    'uninstall',
    root,
    dependencies,
    options
  )
}

async function pkgi(pkg) {
  const useYarn = shouldUseYarn()
  console.log(`Installing ${kleur.cyan(pkg)}`)
  console.log()

  return install(process.cwd(), [pkg], { useYarn })
}

async function pkgrm(pkg) {
  const useYarn = shouldUseYarn()
  console.log(`Remove ${kleur.cyan(pkg)}`)
  console.log()

  return uninstall(process.cwd(), [pkg], { useYarn })
}

module.exports.pkgi = pkgi
module.exports.pkgrm = pkgrm
module.exports.install = install
module.exports.uninstall = uninstall
