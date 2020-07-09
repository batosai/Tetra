const path = require('path')
const { express, services } = require('@tetrajs/core')
const router = require('@tetrajs/router').router

const { webpack } = require('@tetrajs/webpack')
const { MiddlewaresService } = services

module.exports = function (dirname) {
  const app = express()
  const name = path.basename(path.join(dirname, '../'))

  app.set('name', name)

  app.set('views', [path.join(dirname, 'views')])
  app.set('view engine', 'pug')

  // Load modules and Middlewares
  ;(async () => {
    const mws = await MiddlewaresService.get()

    for (const key in mws) {
      app.use(require(mws[key]))
    }

    app.use(
      '/',
      router.configure({
        routes: require(`${dirname}/config/routes`),
        controllers: require(`${dirname}/controllers`),
      }),
    )
  })()

  webpack.run(require(path.join(dirname, 'config/webpack')))

  return app
}
