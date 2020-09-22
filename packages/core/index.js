module.exports.express = require('express')
module.exports.imageSize = require('image-size')
module.exports.dotenv = require('dotenv')
module.exports.session = require('express-session')
module.exports.sessionFileStore = require('session-file-store')
module.exports.bcrypt = require('bcrypt')
module.exports.slugify = require('slugify')
module.exports.uuid = require('uuid')

module.exports.cache = require('./modules/cache')
module.exports.database = require('./modules/database')
module.exports.auth = require('./modules/auth')
module.exports.security = require('./modules/security')
module.exports.i18n = require('./modules/i18n')
module.exports.uploader = require('./modules/uploader')
module.exports.event = require('./modules/event')

module.exports.services = require('./services')

module.exports.utils = require('./lib/utils')

module.exports.models = require('./modules/database/mongodb/models')
