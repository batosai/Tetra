const commander = require('commander')
const prompts = require('prompts')
const chalk = require('chalk')
const Command = require('./command')
const shouldUseYarn = require('./shouldUseYarn')
const { install, uninstall, pkgi, pkgrm } = require('./install')

module.exports.shouldUseYarn = shouldUseYarn
module.exports.install = install
module.exports.uninstall = uninstall
module.exports.pkgi = pkgi
module.exports.pkgrm = pkgrm
module.exports.Command = Command

module.exports.commander = commander
module.exports.prompts = prompts
module.exports.chalk = chalk
