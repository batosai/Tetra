const { WebpacksService } = require('../services')

module.exports = async (req, res, next) => {
  const base = 'build'
  const entrypoints = await WebpacksService.get()

  const name = req.app.get('name')

  res.locals.assets = function(file) {
    if (
      typeof entrypoints[name] !== 'undefined' &&
      typeof entrypoints[name][file] !== 'undefined'
    ) {
      return `/${base}/${name}/${entrypoints[name][file]}`
    }
    return null
  }

  next()
}
