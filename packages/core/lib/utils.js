const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { promisify } = require('util')

const { ModulesService } = require('../services')
const types = require('./types')

const globSync = promisify(glob)

module.exports.capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

module.exports.permitParameters = (permit, query, blank = true) => {
  let params = {}

  for (const key of permit) {
    if (query[key] !== undefined) {
      if (blank) {
        params[key] = query[key]
      } else {
        if (query[key] !== '') {
          params[key] = query[key]
        }
      }
    }
  }

  return params
}

module.exports.qs = (...args) => {
  const ret = []

  for (let arg of args) {
    for (let data in arg) {
      ret.push(encodeURIComponent(data) + '=' + encodeURIComponent(arg[data]))
    }
  }

  return ret.join('&')
}

module.exports.mimeTypes = function(mime) {
  if (types[mime] !== undefined) {
    return types[mime].group
  }
  return 'document'
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
