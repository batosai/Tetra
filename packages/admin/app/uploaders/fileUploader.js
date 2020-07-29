const { Uploader } = require('@tetra/core').uploader

module.exports = class FileUploader extends Uploader {
  constructor(name) {
    super(name)
    this.versions = [
      {
        name: 'thumb',
        width: 536,
        height: 268,
        crop: {
          position: 'top',
          gravity: 'center',
        },
        //crop: false
      },
    ]
  }
}
