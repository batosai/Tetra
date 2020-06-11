const { mongoose } = require('../../')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Invalid name'],
    },
    version: { type: String, default: null },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Module', schema)
