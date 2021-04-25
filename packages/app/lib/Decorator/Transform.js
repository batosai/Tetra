const path = require('path')
const { transformFile } = require('@babel/core')

const cache = require('@tetrajs/core/lib/cache')

class Transform {
  static async apply(file, dest) {
    return new Promise(resolve => {
      transformFile(file, {
        plugins: [
          ["@babel/plugin-proposal-decorators", {
            "legacy": true
          }],
          "@babel/plugin-proposal-class-properties"
        ]
      }, async (err, result) => {
        if (err) {
          console.error(err)
        }
        else {
          const filename = path.basename(file)
          const dirpath = path.dirname(file)

          const code = result.code
            .replace(/require\(\'..\//g, `require('${dirpath}/../`)
            .replace(/import \'..\//g, `import '${dirpath}/../`)
            .replace(/from \'..\//g, `from '${dirpath}/../`)

          await cache.set(filename, code, dest)
          resolve(path.join(dest, filename))
        }
      })
    })
  }
}

module.exports = Transform
