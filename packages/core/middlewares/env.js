module.exports = function(req, res, next) {
  res.locals.env = function() {
    return process.env.NODE_ENV
  }
  next()
}
