const fs = require('fs').promises
const formidable = require('formidable')
const sharp = require('sharp')
const uuidv1 = require('uuid').v1
const imageSize = require('image-size')
const File = require('./file')

const config = {
	default: 'local',
	disks: {
		local: {
			driver: 'local',
			config: {
				root: process.cwd() + '/storage',
			},
    },
  }
}

const { StorageManager } = require('@slynova/flydrive')
const storage = new StorageManager(config)

module.exports = class Uploader {
  constructor(name = 'file') {
    this.name = name
    this.versions = []

    this.form = new formidable.IncomingForm({ hash: true })
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

      const buffer = await storage.disk('local').getBuffer(req.file.name)
      let metadata = {}

      if (!File.isImage(req.file.mimetype)) {
        versions = []
      } else {
        try {
          metadata = await imageSize(buffer.raw)
        } catch (err) {
          console.error(err)
        }
      }

      req.files = {
        original: {
          mimetype: req.file.mimetype,
          filename: req.file.name,
          size: req.file.size,
          ...metadata,
        },
      }

      await Promise.all(
        versions.map(async (version) => {
          const filename = uuidv1()
          const bufferVersion = await sharp( buffer.raw )
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
            .toBuffer()

            await storage.disk('local').put(filename, bufferVersion)
            const { size } = await storage.disk('local').getStat(filename)

          try {
            const dest = await storage.disk('local').getBuffer(filename)
            metadata = await imageSize(dest.raw)
          } catch (err) {
            console.error(err)
          }

          req.files[version.name] = {
            mimetype: req.file.mimetype,
            filename,
            size,
            ...metadata,
          }
        }),
      )

      next()
    }
  }

  single() {
    return async (req, res, next) => {
      this.form.parse(req, async(err, fields, files) => {
        // this.validate(req, file, cb) -> cb va faire les lignes qui suit si ok sinon error

        const f = files[this.name]
        const name = uuidv1()
        const buffer = await fs.readFile(f.path)
        await storage.disk('local').put(name, buffer)
        const { size, modified } = await storage.disk('local').getStat(name)

        req.file = {
          name,
          originalname: f.name,
          mimetype: f.type,
          size,
          modified
        }

        next()
      })
    }
  }

  process(req, res) {
    return [this.single(), this.generateVersions(this.versions)]
  }
}
