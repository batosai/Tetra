const fs = require('fs')
const path = require('path')
const util = require('util')
const rimraf = require('rimraf')

const dir = path.join(`${process.cwd()}/var`, 'cache')

const writeFile = util.promisify(fs.writeFile)
const exists = util.promisify(fs.exists)
const mkdir = util.promisify(fs.mkdir)
const unlink = util.promisify(fs.unlink)

const folder = async function (path) {
  if (!(await exists(path))) {
    return mkdir(path)
  }
}

module.exports.exist = async function (name) {
  return new Promise((resolve) => {
    fs.access(path.join(dir, name), fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else resolve(true)
    })
  })
}

module.exports.get = async function (name) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(dir, name), 'utf8', function (err, data) {
      // if (err) {
      //   reject(err)
      // }
      resolve(data)
    })
  })
}

module.exports.set = async function (name, value) {
  await folder(dir)
  return writeFile(path.join(dir, name), value)
}

module.exports.clear = function (name = null) {
  if (name) {
    return unlink(path.join(dir, name))
  }

  return new Promise((resolve, reject) => {
    rimraf(dir, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}
