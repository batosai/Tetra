const fs = require('fs')

module.exports.exist = async function (name) {
  return new Promise((resolve) => {
    fs.access(name, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else resolve(true)
    })
  })
}
