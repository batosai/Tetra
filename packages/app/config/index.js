const config = {}

try {
  config.app = { ...require('./app'), ...require(`${process.cwd()}/config/app`)}
} catch (e) { config.app = require('./app') }

try {
  config.cors = { ...require('./cors'), ...require(`${process.cwd()}/config/cors`)}
} catch (e) { config.cors = require('./cors') }

try {
  config.database = { ...require('./database'), ...require(`${process.cwd()}/config/database`)}
} catch (e) { config.database = require('./database') }

try {
  config.session = { ...require('./session'), ...require(`${process.cwd()}/config/session`)}
} catch (e) { config.session = require('./session') }

try {
  config.shield = { ...require('./shield'), ...require(`${process.cwd()}/config/shield`)}
} catch (e) { config.shield = require('./shield') }

module.exports = config
