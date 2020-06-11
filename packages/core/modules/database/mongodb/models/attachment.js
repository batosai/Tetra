const { mongoose, mongoosePaginate } = require('../../')
const f = require('./plugins/file')
const File = require('../../../uploader/file')

const defaultName = 'original'
const Schema = mongoose.Schema

const schema = new Schema(
  {
    name: { type: String, trim: true, required: [true, 'Invalid File'] },
    mimetype: String,
    filedata: Schema.Types.Mixed,
  },
  { timestamps: true },
)

schema.plugin(f)

schema.methods.version = function (name) {
  return this.filedata[name]
}

schema.methods.file = function (name = defaultName) {
  return this.version(name)
}

schema.methods.filePath = function (name = defaultName) {
  const basePath = global.config.path.uploads
  if (this.filedata[name] === undefined) {
    return `${basePath}${this.filedata[defaultName].filename}`
  }
  return `${basePath}${this.filedata[name].filename}`
}

schema.methods.fileUrl = function (name = defaultName, system = false) {
  const baseUrl = system
    ? global.config.system.path.uploads
    : global.config.url.uploads
  if (this.filedata[name] === undefined) {
    return `${baseUrl}${this.filedata[defaultName].filename}`
  }
  return `${baseUrl}${this.filedata[name].filename}`
}

schema.methods.imagePath = function (name = defaultName) {
  return this.filePath(name)
}

schema.methods.isImage = function () {
  return File.isImage(this.mimetype)
}

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('Attachment', schema)
