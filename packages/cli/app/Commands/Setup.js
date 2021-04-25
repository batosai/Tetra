const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const os = require('os')

const { Command } = require('../..')

class Setup extends Command {
  configure() {
    this.name = 'setup'
    this.description = 'Initialize configuration(database)'

    this.addOption('--host', 'Set database host', '127.0.0.1')
    this.addOption('--port', 'Set database port', '27017')
    this.addOption('--username', 'Set database username')
    this.addOption('--password', 'Set database password')
    this.addOption('--name', 'Set database name')

    this.addOption('-e, --env', 'Set environment', 'development')

    this.default = {
      env: 'development',
      host: '127.0.0.1',
      port: 27017,
      username: '',
      password: '',
      name: 'tetra',
    }

    this.questions = [
      {
        type: 'select',
        name: 'env',
        message: 'Environnement:',
        choices: [
          { title: 'Production', value: 'production' },
          { title: 'Development', value: 'development' },
        ],
        initial: this.default.env === 'development' ? 1 : 0,
      },
      {
        type: 'text',
        name: 'host',
        message: 'Database host:',
        initial: this.default.host,
      },
      {
        type: 'number',
        name: 'port',
        message: 'Database port:',
        initial: this.default.port,
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
        initial: this.default.name,
      },
    ]

    return super.configure()
  }

  async execute(args, options = {}) {
    if (Object.keys(options).length) {
      options.env = options.e ? options.e : null
    }

    const filename = '.env'
    fs.access(path.join('./', filename), fs.constants.F_OK, async (err) => {
      if (err) {
        let responses = {}
        if (!Object.keys(options).length) {
          console.log(this.kleur.green('Configuring environnement'))
          responses = await this.prompts(this.questions)
        } else {
          responses = { ...this.default, ...options }
        }

        this.generator('./', responses)
        this.generator('./', {
          ...responses,
          env: 'test',
          filename: '.env.test',
        })
      } else
        console.error(this.kleur.red('Environnement is already configured'))
    })
  }

  generator(app, opt = {}) {
    const buf = crypto.randomBytes(64)
    const env = opt.env || 'development'
    const filename = opt.filename || '.env'
    const type = opt.type || 'mongodb'
    fs.writeFileSync(
      path.join(app, filename),
      `NODE_ENV=${env}

DB_CONNECTION=${type}
DB_HOST=${opt.host || '127.0.0.1'}
DB_PORT=${opt.port || '27017'}
DB_USER=${opt.username || ''}
DB_PASSWORD=${opt.password || ''}
DB_NAME=${opt.env === 'test' ? 'tetra_test' : opt.name}

SESSION_TYPE=database
SESSION_SECRET=${buf.toString('hex')}
      ` + os.EOL,
    )
  }
}

module.exports = Setup
