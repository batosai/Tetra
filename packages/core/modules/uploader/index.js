const multer = require('multer')
const sharp = require('sharp')
const uuidv1 = require('uuid').v1
const { promisify } = require('util')
const sizeOf = promisify(require('image-size'))
const File = require('./file')

module.exports = class Uploader {
  constructor(name = 'file') {
    this.name = name
    this.dest = global.config.system.path.tmp
    this.versions = []

    this.multer = multer({
      dest: this.dest,
      fileFilter: this.validate,
    })
  }

  validate(req, file, cb) {
    // if (!File.isImage(file.mimetype)) {
    //   cb(null, false)
    // }
    // else {
    //   cb(null, true)
    // }

    cb(null, true)

    // { fieldname: 'image',
    //   originalname: 'Capture d’écran de 2019-05-01 13-05-38.png',
    //   encoding: '7bit',
    //   mimetype: 'image/png' }
    // cb(null, false)
    // cb(null, true)
    // cb(new Error('I don\'t have a clue!'))
  }

  generateVersions(versions) {
    return async (req, res, next) => {
      if (!req.file) {
        return next()
      }
      let metadata = {}

      if (!File.isImage(req.file.mimetype)) {
        versions = []
      } else {
        try {
          metadata = await sizeOf(req.file.path)
        } catch (err) {
          console.error(err)
        }
      }

      req.files = {
        original: {
          mimetype: req.file.mimetype,
          filename: req.file.filename,
          size: req.file.size,
          ...metadata,
        },
      }

      await Promise.all(
        versions.map(async (version) => {
          const filename = uuidv1()
          const dest = `${req.file.destination}${filename}`
          const data = await sharp(req.file.path)
            .resize({
              width: version.width,
              height: version.height,
              quality: version.quality ? version.quality : 80,
              progressive: true,
              // fit: 'contain',
              position: version.crop ? version.crop.position : 'centre',
              gravity: version.crop ? version.crop.gravity : 'centre',
            })
            .toFormat(
              version.format ? version.format : File.format(req.file.mimetype),
            )
            .toFile(dest)

          try {
            metadata = await sizeOf(dest)
          } catch (err) {
            console.error(err)
          }

          req.files[version.name] = {
            mimetype: `image/${data.format}`,
            filename,
            size: data.size,
            ...metadata,
          }
        }),
      )

      next()
    }
  }

  process(req, res) {
    return [this.multer.single(this.name), this.generateVersions(this.versions)]
  }
}
