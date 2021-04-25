class TetraMiddleware {

  // static global // include for all modules
  static autoload = true // autoload in all modules and current modules

  static async handle(req, res, next) {
    await next()
  }

}

module.exports = TetraMiddleware
