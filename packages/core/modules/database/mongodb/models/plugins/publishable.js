const moment = require('moment')

module.exports = function publishable(schema, options) {
  schema.add({
    publishedAt: { type: Date, default: new Date(), get: toHumans },
  })

  function toHumans(val) {
    if (!val) return val
    return moment(val).format('YYYY-MM-DD')
  }

  if (options && options.index) {
    schema.path('publishable').index(options.index)
  }
}
