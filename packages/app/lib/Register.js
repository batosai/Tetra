const path = require('path')
const os = require('os')

const { fetchIn, mkdir, stat } = require('@tetrajs/core/lib/file')
const cache = require('@tetrajs/core/lib/cache')
const Transform = require('./Decorator/Transform')
const config = require('../config')

class Register {

  static async createTree(type, modulePath) {
    return new Promise(async resolve => {
      const dirs = [...config.app.path.cache, path.basename(modulePath), ...config.app.path[type]]

      // Create tree
      let dirPath = config.basePath
      for await (const iterator of dirs) {
        dirPath = path.join(dirPath, iterator)
        await mkdir(dirPath)
      }
      resolve(dirPath)
    })
  }

  static async create(type, modulePath, files=null) {
    const data = []

    if (files === null) {
      files = await fetchIn(`${path.join(modulePath, ...config.app.path[type])}/**`)
    }

    let dirPath = await this.createTree(type, modulePath)

    // const files = await fetchIn(`${path.join(modulePath, ...config.app.path[type])}/**/*.js`)

    const relation = {}
    for (const file of files) {
      // const parse = path.parse(file)
      // const dir = parse.dir.replace(config.basePath, '')
      // const dirs = [...config.app.path.cache, ...dir.split('/')]

      // let dirPath = config.basePath
      // for await (const iterator of dirs) {
      //   dirPath = path.join(dirPath, iterator)
      //   await mkdir(dirPath)
      // }

      if ((await stat(file)).isDirectory()) {
        dirPath = path.join(dirPath, path.basename(file))
        await mkdir(dirPath)
      }
      else {
        const f = await Transform.apply(file, dirPath)
        // const basename = require(f).key
        data.push(f)

        relation[file] = f
      }
    }

    this.#save(relation)

    return data
  }

  // Private

  static async #save(data) {
    let history = {}
    const name = 'Relations'
    if (await cache.exist(name)) {
      history = await cache.get(name, JSON.parse)
    }
    await cache.set(name, JSON.stringify({ ...history,  ...data }, null, 2) + os.EOL)
  }
}

module.exports = Register
