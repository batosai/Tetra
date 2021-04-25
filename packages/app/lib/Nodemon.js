const nodemon = require('nodemon')
const path = require('path')
const fs = require('fs')

const config = require('../config')
const cache = require('@tetrajs/core/lib/cache')
const { Transform } = require('./Decorator/Transform')
const Register = require('./Register')

class Nodemon {
  constructor(args) {
    nodemon({
      script: path.join(__dirname, '../bin/serve'),
      ...config.environments.development.server,
      args
    })

    nodemon
      .on('start', this.start)
      .on('quit', this.quit)
      .on('restart', this.restart)
      .on('readable', this.readable)
  }

  start() {
    console.log(`
 ___
  |   _  _|_ __  _
  |  (/_  |_ |  (_| . JS

 =======================
`)
  }

  quit() {
    console.log('App has quit')
    process.exit()
  }

  restart(files) {
    console.log('App restarted due to: ', files)

    files.forEach(async file => {
      let type = ''

      if (file.includes(path.join(...config.app.path.middlewares))) {
        type = 'middlewares'
      }

      if (file.includes(path.join(...config.app.path.models))) {
        type = 'models'
      }

      if (file.includes(path.join(...config.app.path.controllers))) {
        type = 'controllers'
      }

      if (type !== '') {

        let relations = {}
        if (await cache.exist('Relations')) {
          relations = await cache.get('Relations', JSON.parse)
        }

        if (relations[file]) {
          const dirPath = path.dirname(relations[file])
          await Transform.apply(file, dirPath)
        }
        else {
          const split = file.split(path.join(...config.app.path[type], '/'))
          const modulePath = split[0]
          const extract = split[1].split('/')

          let dirs = [path.join(modulePath, ...config.app.path[type])]
          for (let index = 0; index < extract.length; index++) {
            dirs.push(path.join(dirs[dirs.length - 1], extract[index]))
          }

          await Register.create(type, modulePath, config, dirs)
        }

      }
    })
  }

  readable() {
    this.stdout.pipe(fs.createWriteStream(config.environments.development.server.log.stdout))
    this.stderr.pipe(fs.createWriteStream(config.environments.development.server.log.stderr))
  }
}

module.exports = Nodemon
