const path = require('path')

module.exports = require('@tetrajs/core/ui/config/webpack')(
  path.resolve(__dirname, '../../dist'),
)
