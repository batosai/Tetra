const fs = require('fs')
const BaseController = require('@tetrajs/router').baseController

module.exports = class AttachmentsController extends BaseController {

  async index(req, res, next) {
    // const attachment = await AttachmentsService.findById(req.params.id)
    // const url = attachment.fileUrl('original', true)

    // // TODO refacto res.attachment()
    // // https://expressjs.com/en/4x/api.html#req
    // fs.readFile(url, function(err, data) {
    //   if (err) {
    //     res.writeHead(404)
    //     return res.end('File not found.')
    //   }

    //   res.setHeader('Content-Type', attachment.mimetype)
    //   res.writeHead(200)
    //   res.end(data)
    // })
  }

}
