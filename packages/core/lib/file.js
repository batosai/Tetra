const fs = require('fs')
const path = require('path')
const glob = require('glob')
const util = require('util')

// const Modules = require('./Class/Modules')

const globSync = util.promisify(glob)
const exists = util.promisify(fs.exists)
const mkdir = util.promisify(fs.mkdir)
const stat = util.promisify(fs.stat)

module.exports.stat = async path => {
  return stat(path)
}

module.exports.mkdir = async path => {
  if (!(await exists(path))) {
    return mkdir(path)
  }
}

module.exports.exist = async function (name) {
  return new Promise((resolve) => {
    fs.access(name, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else resolve(true)
    })
  })
}

module.exports.fetchIn = function (s) {
  return globSync(s, {ignore: '/**/index.js'})
}

module.exports.fetchFilesInModules = async function (s) {
  return new Promise(async (resolve) => {
    // const modules = await Modules.fetch()
    // modules['core'] = { path: path.join(__dirname, '../') }
    let results = []

    // for (const key in modules) {
    //   const res = await module.exports.fetchFiles(`${modules[key].path}/${s}`)
    //   results = [...results, ...res]
    // }

    resolve(results)
  })
}
