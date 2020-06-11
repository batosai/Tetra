const { express } = require('../../')
const i18n = require('i18n')
const path = require('path')

const app = express()

const info = path.parse(__dirname)
app.set('name', info.name)

app.on('mount', function (parent) {
  // const directory = path.join(parent.get('appPath'), 'var/i18n')

  const pkg = require(`${parent.get('appPath')}/package.json`)
  const pkgTetra = Object.keys(pkg.dependencies).filter(
    (module) => module !== '@tetrajs/app' && module.includes('@tetrajs/'),
  )

  let staticCatalog = {
    fr: {},
    en: {},
  }

  for (let i in pkgTetra) {
    try {
      const fr = require(`${pkgTetra[i]}/app/config/locales/fr.json`)
      const en = require(`${pkgTetra[i]}/app/config/locales/en.json`)

      staticCatalog.fr = { ...staticCatalog.fr, ...fr }
      staticCatalog.en = { ...staticCatalog.en, ...en }
    } catch (e) {}
  }

  i18n.configure({
    locales: ['fr', 'en'],
    defaultLocale: 'en',
    // directory,
    objectNotation: true,
    updateFiles: false,
    syncFiles: false,
    queryParameter: 'lang',
    cookie: 'language',
    register: app,
    staticCatalog,
  })

  app.use(i18n.init)
})

module.exports = app
