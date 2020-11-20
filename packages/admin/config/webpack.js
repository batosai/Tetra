const path = require('path')
const { Generator } = require('@tetrajs/webpack')

const entry = path.join(__dirname, '../resources/assets/javascripts/index.js')

const generator = new Generator()
generator.addEntry(
  path.basename(path.join(__dirname, '../../')),
  entry
)

module.exports = generator.getWebpackConfig()
