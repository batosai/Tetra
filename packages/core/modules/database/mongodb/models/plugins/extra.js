module.exports = function extra(schema, options) {
  schema.add({
    extra: { type: Map, of: String, trim: true },
  })

  if (options && options.index) {
    schema.path('extra').index(options.index)
  }
}
