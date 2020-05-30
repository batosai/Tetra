const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const os = require('os')

module.exports = (app, opt={}) => {
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
DATABASE_NAME=tetra_${env}

SESSION_TYPE=database
SESSION_SECRET=${buf.toString('hex')}
    ` + os.EOL,
  )
}
