const { Uploader, File } = require('@tetrajs/core').uploader

module.exports = class ImageUploader extends Uploader {
  constructor() {
    super()
    this.versions = [
      {
        name: 'thumb',
        // format: 'jpeg',
        width: 536,
        height: 268,
        crop: {
          position: 'top',
          gravity: 'center',
        },
        //crop: false
      },
      {
        name: 'topng',
        format: 'png',
        width: 536,
        height: 268,
        crop: true,
      },
    ]
  }

  validate(req, file, cb) {
    if (!File.isImage(file.mimetype)) {
      cb(null, false)
    } else {
      cb(null, true)
    }
  }
}
