const path = require('path')
const Cache = require('./Cache')
const Register = require('./Register')
const config = require('../config')

class Modules extends Cache {
  static async caching() {
    const appPath = config.basePath

    const pkg = require(`${appPath}/package.json`)
    const pkgs = { ...pkg.dependencies, ...pkg.devDependencies }

    const modules = {}
    for (let i in pkgs) {
      try {
        const info = require(`${i}/package.json`)
        const tetra = info.tetra
        if (tetra) {
          const modulePath = path.join(appPath, 'node_modules', i)
          modules[info.name] =  {
            autoload: true,
            ...tetra,
            path: modulePath,
            packageName: info.name,
            version: info.version,
            middlewares: await Register.create('middlewares', modulePath),
            controllers: await Register.create('controllers', modulePath),
            // models: await Register.create('models', modulePath),
            // commands: await Register.create('commands', modulePath),
          }
        }
      } catch (e) {}
    }

    const tetra = pkg.tetra
    modules[pkg.name] = {
      autoload: true,
      ...tetra,
      path: appPath,
      packageName: pkg.name,
      version: pkg.version,
      middlewares: await Register.create('middlewares', appPath),
      controllers: await Register.create('controllers', appPath),
      // models: await Register.create('models', appPath),
      // commands: await Register.create('commands', appPath),
    }

    this.data = modules

    return await super.caching()
  }
}

module.exports = Modules
