const { cache } = require('../')

module.exports = class ModulesService {
  static async get() {
    if (await cache.exist('modules')) {
      return await cache.get('modules', JSON.parse)
    } else {
      return ModulesService.create()
    }
  }

  static async create() {
    const appPath = process.cwd()
    const pkg = require(`${appPath}/package.json`)

    const modules = {}
    for (let i in pkg.dependencies) {
      try {
        const tetra = require(`${i}/package.json`).tetra
        if (tetra) {
          modules[tetra.namespace] = `${appPath}/node_modules/${i}`
        }
      } catch (e) {}
    }

    const tetra = require(`${appPath}/package.json`).tetra
    modules[tetra.namespace] = `${appPath}/app`
    cache.set('modules', JSON.stringify(modules))

    return modules
  }
}
