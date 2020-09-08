module.exports.setup = require('./setup')
module.exports.informations = require('./informations')

module.exports.install = require('./module/install')
module.exports.remove = require('./module/remove')
module.exports.link = require('./module/link')
module.exports.unlink = require('./module/unlink')
module.exports.list = require('./module/list')

module.exports.model = require('./database/model')
module.exports.reset = require('./database/reset')
module.exports.seed = require('./database/seed')
