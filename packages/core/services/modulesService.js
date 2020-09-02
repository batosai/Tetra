const { cache } = require('../')

module.exports = class ModulesService {
  static get cacheName() {
    return 'modules'
  }

  static async get() {
    if (await cache.exist(ModulesService.cacheName)) {
      return await cache.get(ModulesService.cacheName, JSON.parse)
    } else {
      return ModulesService.caching()
    }
  }

  static async caching() {
    const appPath = process.cwd()
    const pkg = require(`${appPath}/package.json`)
    const pkgs = { ...pkg.dependencies, ...pkg.devDependencies }

    const modules = {}
    for (let i in pkgs) {
      try {
        const tetra = require(`${i}/package.json`).tetra
        if (tetra) {
          modules[tetra.namespace] = `${appPath}/node_modules/${i}`
        }
      } catch (e) {}
    }

    const tetra = require(`${appPath}/package.json`).tetra
    modules[tetra.namespace] = appPath
    cache.set(ModulesService.cacheName, JSON.stringify(modules))

    return modules
  }
}
