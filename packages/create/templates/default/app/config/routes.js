const { namespace, root, resources, get, post, put, remove } = require('@tetrajs/router')

module.exports = namespace('/', [
  root('home'),
])
