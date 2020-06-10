const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const config = require('./default.config')

const app = path.join(`${process.cwd()}/app/assets/javascripts/index.js`)
const c = { entry: { app } }

module.exports = webpack([
  { ...config, ...c }
], async (err, stats) => {
  const filename = path.join(process.cwd(), './var/log/webpack.log')

  process.stdout.write(stats.toString({
    chunks: false,
    colors: true
  }) + '\n');

  fs.appendFile(filename, stats.toString({
    chunks: true,
    colors: false
  }));

})
