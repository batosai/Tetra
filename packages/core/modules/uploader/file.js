module.exports = class File {
  // TODO RF type image, methode get mimetype

  static getMimetypesImage() {
    return [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/tiff',
      'image/webp',
      'image/raw',
      'image/bmp',
      'image/vnd.microsoft.icon',
      'image/svg+xml',
    ]
  }

  static isImage(mimetype) {
    const mimetypes = File.getMimetypesImage()

    return mimetypes.indexOf(mimetype) !== -1
  }

  static isDocument(minetype) {
    const minetypes = ['application/vnd.oasis.opendocument.spreadsheet']

    return mimetypes.indexOf(mimetype) !== -1
  }

  static format(mimetype) {
    // TODO vnd.oasis.opendocument.spreadsheet = ods
    return mimetype.split('/')[1]
  }
}
