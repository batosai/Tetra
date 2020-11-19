const flash = require('connect-flash')

const TetraApp = require('@tetrajs/app')
const app = new TetraApp(__dirname)
app.use(flash())

module.exports = app.export()
