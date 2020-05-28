const { mongoose, mongoosePaginate } = require('../../')
const slugify = require('slugify')
const publishable = require('./plugins/publishable')
const language = require('./plugins/language')
const state = require('./plugins/state')
const extra = require('./plugins/extra')

const Schema = mongoose.Schema

const schema = new Schema(
  {
    title: { type: String, trim: true, required: [true, 'Invalid title'] },
    slug: { type: String, trim: true, required: [true, 'Invalid slug'] },
    content: String,
    tags: { type: String, trim: true },
    order: { type: Number, default: 0 },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attachment',
    },
  },
  { timestamps: true },
)

schema.plugin(publishable)
schema.plugin(language)
schema.plugin(state)
schema.plugin(extra, { index: true })
schema.plugin(mongoosePaginate)

schema.pre('validate', async function(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title).toLowerCase()
  } else if (this.slug) {
    this.slug = slugify(this.slug).toLowerCase()
  }
  next()
})

schema.pre('save', async function(next) {
  let id = this._id,
    slug = this.slug,
    count = 0,
    i = 1

  do {
    if (count) {
      slug = this.slug + `-${i}`
    }
    count = await this.model(this.constructor.modelName).countDocuments({
      slug,
      _id: { $ne: id },
    })
    i++
  } while (count !== 0)

  this.slug = slug
  next()
})

module.exports = mongoose.model('Page', schema)
