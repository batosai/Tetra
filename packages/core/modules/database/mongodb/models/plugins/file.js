const fs = require('fs')

module.exports = function file(schema, options) {
  // schema.post('save', async function () {
  //   for (let key in this.filedata) {
  //     if (this.filedata.hasOwnProperty(key)) {
  //       const data = this.filedata[key]
  //       fs.rename(
  //         `${global.config.system.path.tmp}${data.filename}`,
  //         `${global.config.system.path.uploads}${data.filename}`,
  //       )
  //     }
  //   }
  // })

  schema.pre('remove', async function (next) {
    for (let key in this.filedata) {
      if (this.filedata.hasOwnProperty(key)) {
        const data = this.filedata[key]
        //TODO refacto
        // fs.unlink(`${global.config.system.path.uploads}${data.filename}`)
      }
    }
    next()
  })

  // schema.pre('deleteMany', async function(next) {
  //   console.log(this)
  //   next()
  // })

  if (options && options.index) {
    schema.path('file').index(options.index)
  }
}
