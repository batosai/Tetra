// const path = require('path')
const flash = require('connect-flash')

// const express = require('@tetrajs/core').express
// const { helpers, uiPath } = require('@tetra/core').ui
// const router = require('@tetrajs/router').router

// const app = express()

// const info = path.parse(__dirname)
// app.set('name', info.name)

// app.locals.basedir = path.join(uiPath, 'views')

// app.set('views', path.join(__dirname, 'app/views'))
// app.set('view engine', 'pug')

// app.use(flash())

// app.use(helpers.assets)
// app.use(helpers.env)

// app.use('/users', router.configure({
//   routes: require('./app/config/routes'),
//   controllers: require('./app/controllers')
// }))

// module.exports = app

const tetra = require('@tetrajs/app')
const app = tetra(__dirname)
app.use(flash())

module.exports = app

// module.exports.middlewares = require('@tetrajs/auth-ui/app/middlewares')
