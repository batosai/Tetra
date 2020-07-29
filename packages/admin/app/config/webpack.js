const path = require('path')

module.exports = require('@tetra/core/ui/config/webpack')(
  path.resolve(__dirname, '../../dist'),
)


const path = require('path')
const { Generator } = require('@tetrajs/webpack')

const entry = path.join(__dirname, '../assets/javascripts/index.js')

const generator = new Generator()
generator.addEntry(
  path.basename(path.join(__dirname, '../../')),
  entry
)

module.exports = generator.getWebpackConfig()
