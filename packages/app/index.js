const app = require('./app')
const config = require('./config')

module.exports = app
module.exports.config = config
module.exports.middleware = require('./helpers/middleware')
module.exports.Routes = require('./lib/Routes')
