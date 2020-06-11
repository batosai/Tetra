const { database, dotenv } = require('@tetrajs/core')

module.exports = class ModulesService {
  static async findOrCreate(conditions, options) {
    dotenv.config()
    database.mongodb.connection()

    const { Module } = database.models

    let m = await Module.findOne(conditions)
    if (!m) m = new Module()
    m.name = options.name
    m.version = options.version

    const promise = m.save()
    promise.then(() => database.mongoose.connection.close(true))
    promise.catch((err) => database.mongoose.connection.close(true))

    return promise
  }

  static async fetchModules() {
    dotenv.config()
    database.mongodb.connection()

    const { Module } = database.models
    const promise = Module.find()

    promise.then(() => database.mongoose.connection.close(true))
    return promise
  }

  static async delete(conditions) {
    dotenv.config()
    database.mongodb.connection()

    const { Module } = database.models
    const m = await Module.findOne(conditions)
    const promise = m.delete()

    promise.then(() => database.mongoose.connection.close(true))
    promise.catch((err) => database.mongoose.connection.close(true))

    return promise
  }
}
