const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { promisify } = require('util')

const { ModulesService } = require('../services')

const globSync = promisify(glob)

module.exports.capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

module.exports.exist = async function (name) {
  return new Promise((resolve) => {
    fs.access(name, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else resolve(true)
    })
  })
}

module.exports.fetchFiles = function (s) {
  return globSync(s, {ignore: '/**/index.js'})
}

module.exports.fetchFilesInModules = async function (s) {
  return new Promise(async (resolve) => {
    const modules = await ModulesService.get()
    modules['core'] = { path: path.join(__dirname, '../') }
    let results = []

    for (const key in modules) {
      const res = await module.exports.fetchFiles(`${modules[key].path}/${s}`)
      results = [...results, ...res]
    }

    resolve(results)
  })
}
