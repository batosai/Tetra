module.exports = function(req, res, next) {
  const base = 'build'

  const app = {}

  try {
    app.manifest = require(`${process.cwd()}/public/${base}/manifest.json`)
    console.log('TODO multiple passage')
  } catch (ex) {
    app.manifest = []
  }

  res.locals.assets = function(file) {
    if (app.manifest[file] !== undefined) {
      return `/${base}/${app.manifest[file]}`
    }
    return `/${file}`
  }

  next()
}
