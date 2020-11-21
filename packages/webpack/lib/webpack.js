const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const cb = async (err, stats) => {
  const filename = path.join(process.cwd(), './var/log/webpack.log')

  process.stdout.write(
    stats.toString({
      chunks: false,
      colors: true,
    }) + '\n',
  )

  fs.appendFile(
    filename,
    stats.toString({
      chunks: true,
      colors: false,
    }),
    err => {}
  )
}

module.exports.run = function (configs) {
  const compiler = webpack(configs)
  compiler.run(cb)
}


module.exports.watch = function (configs) {
  const compiler = webpack(configs)
  compiler.watch({}, cb)
}
