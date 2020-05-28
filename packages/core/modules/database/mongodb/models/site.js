const { mongoose } = require('../../')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    language: {
      type: String,
      required: [true, 'Invalid language'],
      enum: ['fr', 'en'],
    },
    title: { type: String, trim: true, required: [true, 'Invalid title'] },
    url: { type: String, required: [true, 'Invalid url'] },
    slogan: String,
    smtp: {
      host: { type: String, default: null },
      port: { type: String, default: null },
      tls: { type: Boolean, default: false },
      username: { type: String, default: null },
      password: { type: String, default: null },
    },
    media: {
      thumbnail: {
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
      },
      medium: {
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
      },
      large: {
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true },
)

// schema.pre('findOneAndUpdate', function(next) {
//   this.options.runValidators = true
//   next()
// })

// return mongo.model('Site', schema)

// Site.schema.path('language').validate(function (value) {
//   return /fr|en/i.test(value)
// }, 'Invalid language')

// Site.schema.path('title').validate(function (value) {
//   return /tetra/i.test(value)
// }, 'Invalid title')

module.exports = mongoose.model('Site', schema)
