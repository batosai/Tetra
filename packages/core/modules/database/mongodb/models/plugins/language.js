module.exports = function language(schema, options) {
  schema.add({
    language: {
      type: String,
      required: [true, 'Invalid language'],
      enum: ['fr', 'en'],
    },
  })

  // schema.pre('validate', async function (next) {
  //   const site = await require('../site').findOne({})
  //   this.language = site.language
  //   next()
  // })

  if (options && options.index) {
    schema.path('language').index(options.index)
  }
}
