const { Attachment } = require('@tetra/core').models
const { File } = require('@tetra/core').uploader

module.exports = class AttachmentsService {
  static async fetchAttachments(req, limit = 20) {
    const filter = req.parameters(['type'], req.query, false)
    let query = {}

    if (filter.type === 'image') {
      query = { mimetype: { $in: File.getMimetypesImage() } }
    }

    return await Attachment.paginate(query, {
      page: req.query.page ? req.query.page : 1,
      limit,
      sort: { createdAt: 'desc' },
    })
  }

  static async createAttachment(req) {
    const params = {}

    if (req.file) {
      params['name'] = req.file.originalname
      params['mimetype'] = req.file.mimetype
      params['filedata'] = req.files
    }

    return new Attachment(params)
  }

  static async findById(id) {
    return await Attachment.findById(id)
  }

  static async deleteOne(id) {
    const attachment = await AttachmentsService.findById(id)
    attachment.delete()
  }
}
