const fs = require('fs')
const path = require('path')
const util = require('util')
const rimraf = require('rimraf')

const { mkdir } = require('./file')

const writeFile = util.promisify(fs.writeFile)
const unlink = util.promisify(fs.unlink)


module.exports.exist = async name => {
  const dir = path.join(`${process.cwd()}/var`, 'cache')
  return new Promise((resolve) => {
    fs.access(path.join(dir, name), fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else resolve(true)
    })
  })
}

module.exports.get = async (name, parse = (o) => o) => {
  const dir = path.join(`${process.cwd()}/var`, 'cache')
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(dir, name), 'utf8', function (err, data) {
      // if (err) {
      //   reject(err)
      // }
      resolve(parse(data))
    })
  })
}

module.exports.set = async (name, value, dir=path.join(`${process.cwd()}/var`, 'cache')) => {
  await mkdir(dir)
  return writeFile(path.join(dir, name), value)
}

module.exports.clear = (name = null) => {
  const dir = path.join(`${process.cwd()}/var`, 'cache')
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
