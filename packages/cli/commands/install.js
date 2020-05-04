'use strict'

const path = require('path')
const fs = require('fs')
const os = require('os')
const { prompts, chalk } = require('../lib')

const files = {
  config: null
}

const questions = [
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
    message: 'Database name(tetra):',
    initial: 'tetra',
  },
]

async function run(config) {
  console.log(chalk.green('Database connexion'))
  const response = await prompts(questions)
  config.database = {
    type: 'mongodb',
    ...response
  }

  fs.writeFileSync(
    files.config,
    JSON.stringify(config, null, 2) + os.EOL
  )
}

module.exports = {
  name: 'install',
  alias: 'i',
  action: ({ env }) => {
    files.config = path.join('./config/environments', `${env}.json`)
    const config = JSON.parse(fs.readFileSync(files.config).toString())

    if (config['database']) {
      console.error(chalk.red('App is already installed'))
    }
    else {
      run(config)
    }
  }
}
