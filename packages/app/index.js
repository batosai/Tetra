const path = require('path')
const express = require('@tetrajs/core').express
const router = require('@tetrajs/router').router

module.exports = function (dirname) {
  const app = express()
  const pkg = require(`${dirname}/../package.json`)

  app.set('name', pkg.name)

  app.set('views', [
    path.join(dirname, 'views')
  ])
  app.set('view engine', 'pug')

  app.use('/', router.configure({
    routes: require(`${dirname}/config/routes`),
    controllers: require(`${dirname}/controllers`)
  }))

  return app
}
