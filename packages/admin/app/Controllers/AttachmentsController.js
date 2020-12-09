const fs = require('fs')
const ApplicationController = require('./ApplicationController')
const { AttachmentsService } = require('../Services')
const RequireAuthentication = require('@tetrajs/auth-ui/app/Middlewares/RequireAuthentication')
const { FileUploader } = require('../Uploaders')

module.exports = class AttachmentsController extends ApplicationController {
  constructor(...args) {
    super(...args)

    const requireAuthentication = new RequireAuthentication()
    const upload = new FileUploader('file')
    // Todo test validator.

    this.middlewares = [
      {
        actions: [
          requireAuthentication.handle,
          // multipart is not compatible csrf
          // security.csrf.protection,
          // security.csrf.token,
          this.setLocale,
        ],
      },
      {
        action: upload.process(),
        only: 'create',
      },
    ]
  }

  async index(req, res, next) {
    const paginate = await AttachmentsService.fetchAttachments(req)

    res.render(req.adminIndexAttachmentsView, {
      title: 'attachments',
      paginate,
      errors: {},
    })
  }

  async show(req, res, next) {
    const attachment = await AttachmentsService.findById(req.params.id)
    const { content } = await attachment.getBuffer('original', true)

    if (!content) {
      res.writeHead(404)
      return res.end('File not found.')
    }

    res.setHeader('Content-Type', attachment.mimetype)
    res.writeHead(200)
    res.end(content)
  }

  async create(req, res, next) {
    const attachment = await AttachmentsService.createAttachment(req)
    const promise = attachment.save()

    promise.then(() => res.redirect(req.adminIndexAttachmentsPath()))
    promise.catch(async err => {
      const paginate = await AttachmentsService.fetchAttachments(req)

      if (req.xhr) {
        for (let key in err.errors) {
          if (err.errors.hasOwnProperty(key)) {
            res.status(400).send(res.__(err.errors[key].message))
          }
        }
      } else {
        res.render(req.adminIndexAttachmentsView, {
          title: 'attachments',
          paginate,
          errors: err.errors,
        })
      }
    })
  }

  async deleteSelected(req, res, next) {
    try {
      for (let id of req.body.ids) {
        await AttachmentsService.deleteOne(id)
      }
    } catch (error) {
      res.status(400).json()
    }
    res.json()
  }
}
