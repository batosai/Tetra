const csrf = require('csurf')

// Middleware for route
module.exports.protection = csrf({ cookie: true })

// Variable for view
module.exports.token = function (req, res, next) {
  if (typeof req.csrfToken === 'function') {
    res.locals.csrfToken = req.csrfToken()
  }
  next()
}
