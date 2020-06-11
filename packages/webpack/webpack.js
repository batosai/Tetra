const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

module.exports.run = function (configs) {
  webpack(configs, async (err, stats) => {
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
    )
  })
}
