const path = require('path')
const { generator } = require('@tetrajs/webpack')

const entry = path.join(__dirname, '../../app/assets/javascripts/index.js')

generator.addEntry('app', entry)

module.exports = generator.getWebpackConfig()
