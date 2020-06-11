const resources = require('./resources')

module.exports = (name) => {
  return resources(name, { only: 'index', root: true })
}
