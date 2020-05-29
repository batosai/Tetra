const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const os = require('os')

module.exports = (app, env='development', fileName='.env') => {
  const buf = crypto.randomBytes(64);
  fs.writeFileSync(
    path.join(app, fileName),
    `NODE_ENV=${env}

DATABASE_TYPE=mongodb
DATABASE_HOST=127.0.0.1
DATABASE_PORT=27017
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=tetra_${env}

SESSION_TYPE=database
SESSION_SECRET=${buf.toString('hex')}
    ` + os.EOL,
  )
}
