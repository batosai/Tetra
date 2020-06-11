const app = require('./app')
const auth = require('@tetrajs/auth-ui')

module.exports = {
  '/users': auth,
  '/': app,
}
