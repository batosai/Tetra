module.exports = function(req, res, next) {
  const queryString = (...args) => {
    const ret = []

    for (let arg of args) {
      for (let data in arg) {
        ret.push(encodeURIComponent(data) + '=' + encodeURIComponent(arg[data]))
      }
    }

    return ret.join('&')
  }

  res.locals.qs = queryString
  next()
}
