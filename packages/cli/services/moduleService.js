const path = require('path')
const { spawn } = require('child_process')
const { database, dotenv, services, utils } = require('@tetrajs/core')
const { exist } = utils

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

  static async assetsInstall(moduleNames=[]) {
    try {
      const modules = await services.ModulesService.get()

      for (const k in modules) {
        const m = modules[k]

        if (moduleNames.length === 0 || moduleNames.indexOf(m.packageName) !== -1) {
          const src = path.join(m.path, 'public/build', m.name)
          const dst = path.join(process.cwd(), 'public/build', m.name)
          const present = await exist(src)
          const presentDest = await exist(dst)

          if (present && !presentDest) {
            await spawn('cp', ['-r', src, dst])
          }
        }
      }
    } catch (error) {}
  }
}
