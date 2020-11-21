module.exports = class BaseController {
  constructor(...arg) {
    this.middlewares = []
  }

  // async wildcard(req, res, next) {
  //   next()
  // }

  async index(req, res, next) {
    next()
  }

  async show(req, res, next) {
    next()
  }

  async new(req, res, next) {
    next()
  }

  async create(req, res, next) {
    next()
  }

  async edit(req, res, next) {
    next()
  }

  async update(req, res, next) {
    next()
  }

  async delete(req, res, next) {
    next()
  }

  middlewaresToArray(method) {
    let m = []

    const add = (middleware) => {
      if (middleware.action !== undefined) {
        m.push(middleware.action)
      }

      if (middleware.actions !== undefined) {
        m = m.concat(middleware.actions)
      }
    }

    this.middlewares.forEach((middleware) => {
      if (middleware.except) {
        if (Array.isArray(middleware.except)) {
          if (!middleware.except.includes(method)) add(middleware)
        } else {
          if (middleware.except !== method) add(middleware)
        }
      } else if (middleware.only) {
        if (Array.isArray(middleware.only)) {
          if (middleware.only.includes(method)) add(middleware)
        } else {
          if (middleware.only === method) add(middleware)
        }
      }

      if (middleware.only === undefined && middleware.except === undefined) {
        add(middleware)
      }
    })

    return m.filter((item, pos, self) => self.indexOf(item) == pos) // array unique
  }
}
