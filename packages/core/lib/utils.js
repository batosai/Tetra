
const capitalize = require('./capitalize')
const permitParameters = require('./permitParameters')
const qs = require('./qs')
const mimeTypes = require('./mimeTypes')
const { exist, fetchFiles, fetchFilesInModules } = require('./file')

module.exports.capitalize = capitalize
module.exports.permitParameters = permitParameters
module.exports.qs = qs
module.exports.mimeTypes = mimeTypes
module.exports.exist = exist
module.exports.fetchFiles = fetchFiles
module.exports.fetchFilesInModules = fetchFilesInModules
