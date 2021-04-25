const config = {
  basePath: process.cwd(),
  environments: {}
}

try {
  config.app = { ...require('./app'), ...require(`${config.basePath}/config/app`)}
} catch (e) { config.app = require('./app') }

try {
  config.cors = { ...require('./cors'), ...require(`${config.basePath}/config/cors`)}
} catch (e) { config.cors = require('./cors') }

try {
  config.database = { ...require('./database'), ...require(`${config.basePath}/config/database`)}
} catch (e) { config.database = require('./database') }

try {
  config.session = { ...require('./session'), ...require(`${config.basePath}/config/session`)}
} catch (e) { config.session = require('./session') }

try {
  config.shield = { ...require('./shield'), ...require(`${config.basePath}/config/shield`)}
} catch (e) { config.shield = require('./shield') }

try {
  config.environments.test = { ...require('./environments/test'), ...require(`${config.basePath}/config/environments/test`)}
} catch (e) { config.environments.test = require('./environments/test') }

try {
  config.environments.development = { ...require('./environments/development'), ...require(`${config.basePath}/config/environments/development`)}
} catch (e) { config.environments.development = require('./environments/development') }

try {
  config.environments.production = { ...require('./environments/production'), ...require(`${config.basePath}/config/environments/production`)}
} catch (e) { config.environments.production = require('./environments/production') }

module.exports = Object.freeze(config)
