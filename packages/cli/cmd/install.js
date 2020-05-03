'use strict'

const path = require('path')
const fs = require('fs')
const os = require('os')
const prompts = require('prompts')
const chalk = require('chalk')

const files = {
  config: path.join('./config', 'database.json')
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

async function run() {
  console.log(chalk.green('Database connexion'))
  const response = await prompts(questions)
  const config = {
    type: 'mongodb',
    ...response
  }

  fs.writeFileSync(
    files.config,
    JSON.stringify(config, null, 2) + os.EOL
  )
}

fs.exists(files.config, exists => {
  if (exists) {
    console.error(chalk.red('App is already installed'))
  }
  else {
    run()
  }
});
