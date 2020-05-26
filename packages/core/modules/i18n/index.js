const { express } = require('../../')
const i18n = require('i18n')
const path = require('path')

const app = express()

const info = path.parse(__dirname)
app.set('name', info.name)

app.on('mount', function (parent) {
  const directory = path.join(parent.get('appPath'), 'var/i18n')

  i18n.configure({
    locales: ['fr', 'en'],
    defaultLocale: 'en',
    directory,
    objectNotation: true,
    updateFiles: false,
    syncFiles: false,
    queryParameter: 'lang',
    cookie: 'language',
    register: app
  })

  app.use(i18n.init)
})

module.exports = app
