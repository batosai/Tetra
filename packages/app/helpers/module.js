const Modules = require('../lib/Modules')

let payload = {}

module.exports = async name => {
  if (Object.entries(payload).length === 0) {
    payload = { ... await Modules.fetch() }
  }

  if (payload[name]) {
    return payload[name]
  }
  return false
}
