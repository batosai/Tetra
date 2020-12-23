class Env {
  static get(name, alternate=null) {
    if (process.env[name]) {
      return process.env[name]
    }
    return alternate
  }
}

module.exports = Env
