
const capitalize = require('./capitalize')
const permitParameters = require('./permitParameters')
const qs = require('./qs')
const mimeType = require('./mimeType')
const { exist, fetchFiles, fetchFilesInModules } = require('./file')

module.exports.capitalize = capitalize
module.exports.permitParameters = permitParameters
module.exports.qs = qs
module.exports.mimeType = mimeType
module.exports.exist = exist
module.exports.fetchFiles = fetchFiles
module.exports.fetchFilesInModules = fetchFilesInModules
