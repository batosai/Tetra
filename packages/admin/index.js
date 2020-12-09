const path = require('path')
// const prettyBytes = require('./app/middlewares/prettyBytes')

const TetraApp = require('@tetrajs/app')
const app = new TetraApp(__dirname)

app.set('views', [
  // path.join(__dirname, 'views/components'),
  path.join(__dirname, 'resources/views'),
])

// app.use(prettyBytes)

module.exports = app.export()
