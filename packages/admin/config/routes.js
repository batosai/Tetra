const {
  namespace,
  root,
  resources,
  get,
  post,
  put,
  remove,
} = require('@tetrajs/router')

module.exports = namespace('/admin', [
  root('home'),
  resources('pages', { except: 'show' }, [
    put(':id/trash', { name: 'pages', action: 'trash' }),
    put('trash', { name: 'pages', action: 'sendToTrash' }),
    remove('trash', { name: 'pages', action: 'deleteSelected' }),
  ]),
  resources('attachments', { only: ['index', 'show', 'create', 'delete'] }, [
    remove('multiple-remove', {
      name: 'attachments',
      action: 'deleteSelected',
    }),
  ]),
  resources('modalAttachments', { only: 'index' }, [
    get('upload', { name: 'modalAttachments', action: 'upload' }),
    get('information/:id', { name: 'modalAttachments', action: 'information' }),
  ]),
  resources('settings', { only: ['index', 'update'] }),
])
