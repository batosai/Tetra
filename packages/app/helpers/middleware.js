const Middlewares = require('../lib/Middlewares')

let payload = {}

;(async () => {
  payload = await Middlewares.fetch()
})()

module.exports = name => {
  if (payload[name]) {
    try {
      const Klass = require(payload[name])
      if ('global' in Klass) {
        return Klass.handle
      }
      return () => {}
    } catch (e) {
      return () => {}
    }
  }
}
