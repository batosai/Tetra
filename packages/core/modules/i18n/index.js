const { express } = require('../../')
const i18n = require('i18n')
const path = require('path')

const app = express()

const info = path.parse(__dirname)
app.set('name', info.name)

app.on('mount', async function (parent) {
  // const { Modules } = require('../../')
  // const pkgTetra = await Modules.fetch()

  let staticCatalog = {
    fr: {},
    en: {},
  }

  // for (let i in pkgTetra) {
  //   try {
  //     const fr = require(`${pkgTetra[i].path}/config/locales/fr.json`)
  //     const en = require(`${pkgTetra[i].path}/config/locales/en.json`)

  //     staticCatalog.fr = { ...staticCatalog.fr, ...fr }
  //     staticCatalog.en = { ...staticCatalog.en, ...en }
  //   } catch (e) {}
  // }

  i18n.configure({
    locales: ['fr', 'en'],
    defaultLocale: 'en',
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
