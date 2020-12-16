const {
  namespace,
  root,
} = require('@tetrajs/router')

module.exports = namespace('/', [root('home')])
