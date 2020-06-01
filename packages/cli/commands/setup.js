const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const os = require('os')

const { Command } = require('../')

module.exports = class Setup extends Command {
  configure() {
    this.name = 'setup'
    this.description = 'Initialize configuration(database)'

    this.questions = [
      {
        type: 'select',
        name: 'env',
        message: 'Environnement:',
        choices: [
          { title: 'Production', value: 'production' },
          { title: 'Development', value: 'development' }
        ],
        initial: 1
      },
      {
        type: 'text',
        name: 'host',
        message: 'Database host:',
        initial: '127.0.0.1',
      },
      {
        type: 'number',
        name: 'port',
        message: 'Database port:',
        initial: 27017,
      },
      {
        type: 'text',
        name: 'username',
        message: 'username:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'password:',
      },
      {
        type: 'text',
        name: 'name',
        message: 'Database name:',
        initial: 'tetra',
      },
    ]

    return super.configure()
  }

  async execute() {
    const filename = '.env'
    fs.access(path.join('./', filename), fs.constants.F_OK, async err => {
      if (err) {
        console.log(this.chalk.green('Configuring environnement'))
        const response = await this.prompts(this.questions)

        this.generator('./', response)
        this.generator('./', {
          ...response,
          env: 'test',
          filename: '.env.test'
        })
      } else (
        console.error(this.chalk.red('Environnement is already configured'))
      )
    })
  }

  generator(app, opt={}) {
    const buf = crypto.randomBytes(64)
    const env = opt.env || 'development'
    const filename = opt.filename || '.env'
    const type = opt.type || 'mongodb'
    fs.writeFileSync(
      path.join(app, filename),
      `NODE_ENV=${env}

DATABASE_TYPE=${type}
DATABASE_HOST=${opt.host || '127.0.0.1'}
DATABASE_PORT=${opt.port || '27017'}
DATABASE_USER=${opt.username || ''}
DATABASE_PASSWORD=${opt.password || ''}
DATABASE_NAME=${ opt.env === 'test' ? 'tetra_test' : opt.name }

SESSION_TYPE=database
SESSION_SECRET=${buf.toString('hex')}
      ` + os.EOL,
    )
  }
}
