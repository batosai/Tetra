module.exports = async (req, res, next) => {

  res.locals.media = (id, version) => {
    return mediaIndexAttachmentsPath({ id, version })
  }

  next()
}
