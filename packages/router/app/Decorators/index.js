const TetraMiddleware = require('../Middlewares/TetraMiddleware')
const TetraController = require('../Controllers/TetraController')

module.exports.Middleware = function(key=null) {
  return function(Class) {
    if (key) {
      Class.key = key
    }
    else {
      Class.key = Class.name
    }
    Object.setPrototypeOf(Class, TetraMiddleware)
  }
}

module.exports.Controller = function(key=null) {
  return function(Class) {
    if (key) {
      Class.key = key
    }
    else {
      Class.key = Class.name
    }
    Object.setPrototypeOf(Class, TetraController)
  }
}
