module.exports.express = require('express')
module.exports.imageSize = require('image-size')
module.exports.dotenv = require('dotenv')
module.exports.session = require('express-session')

module.exports.database = require('./modules/database')
module.exports.auth = require('./modules/auth')
module.exports.security = require('./modules/security')
module.exports.i18n = require('./modules/i18n')
