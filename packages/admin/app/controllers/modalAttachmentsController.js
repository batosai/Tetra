const ApplicationController = require('./applicationController')
const { AttachmentsService } = require('../services')

module.exports = class modalAttachmentsController extends ApplicationController {
  async index(req, res, next) {
    const paginate = await AttachmentsService.fetchAttachments(req)

    res.render(req.adminIndexModalAttachmentsView, {
      title: 'attachments',
      paginate,
      query: req.permitParameters(['type'], req.query, false),
      errors: {},
    })
  }

  async upload(req, res, next) {
    res.render(req.adminUploadModalAttachmentsView, {
      title: 'attachments',
      query: req.permitParameters(['type', 'page'], req.query, false),
    })
  }

  async information(req, res, next) {
    const attachment = await AttachmentsService.findById(req.params.id)
    res.render(req.adminInformationModalAttachmentsView, {
      title: 'attachments',
      query: req.permitParameters(['type', 'page'], req.query, false),
      attachment,
    })
  }
}
