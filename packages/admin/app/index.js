const path = require('path')
const prettyBytes = require('./middlewares/prettyBytes')

const TetraApp = require('@tetrajs/app')
const app = new TetraApp(__dirname)

app.set('views', [
  // path.join(__dirname, 'views/components'),
  path.join(__dirname, 'views'),
])

app.use(prettyBytes)

module.exports = app.export()
