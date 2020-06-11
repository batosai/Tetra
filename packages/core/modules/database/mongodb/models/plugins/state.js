const states = (module.exports.states = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  TRASHED: 'trashed',
})

module.exports = function state(schema, options) {
  schema.add({
    state: {
      type: String,
      default: states.DRAFT,
      enum: [states.DRAFT, states.PUBLISHED, states.TRASHED],
    },
  })

  schema.methods.draft = function () {
    return this.state === this.schema.path('state').enumValues[0]
  }

  schema.methods.published = function () {
    return this.state === this.schema.path('state').enumValues[1]
  }

  schema.methods.trashed = function () {
    return this.state === this.schema.path('state').enumValues[2]
  }

  if (options && options.index) {
    schema.path('state').index(options.index)
  }
}

module.exports.states = states
