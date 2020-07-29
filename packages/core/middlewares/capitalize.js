module.exports = function(req, res, next) {
  res.locals.capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)
  next()
}
