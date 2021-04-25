const {
  namespace,
  resources,
  get,
} = require('@tetrajs/router')

module.exports = namespace('/media', [
  resources('attachments', { root: true }, [
    get('/:id/:version', { name: 'attachments', action: 'index' }),
  ])
])
