const {
  namespace,
  root,
  resources,
  get,
  post,
  put,
  remove,
} = require('@tetrajs/router')

module.exports = namespace('/users', [
  root('home'),
  resources('signIn', { only: ['index', 'create'] }),
  resources('signOut', { only: 'index' }),
])
