const { cache } = require('../')

class ModulesService {
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
        const info = require(`${i}/package.json`)
        const tetra = info.tetra
        if (tetra) {
          modules[info.name] =  {
            ...tetra,
            path: `${appPath}/node_modules/${i}`,
            packageName: info.name
          }
        }
      } catch (e) {}
    }

    const tetra = pkg.tetra
    modules[pkg.name] = {
      ...tetra,
      path: appPath,
      packageName: pkg.name
    }
    cache.set(ModulesService.cacheName, JSON.stringify(modules))

    return modules
  }
}

module.exports = ModulesService
