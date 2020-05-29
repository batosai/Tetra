const commander = require('commander')
const prompts = require('prompts')
const chalk = require('chalk')
const envinfo = require('envinfo')

const Command = require('./lib/command')
const shouldUseYarn = require('./lib/shouldUseYarn')
const { install, uninstall, pkgi, pkgrm } = require('./lib/install')

module.exports.shouldUseYarn = shouldUseYarn
module.exports.install = install
module.exports.uninstall = uninstall
module.exports.pkgi = pkgi
module.exports.pkgrm = pkgrm
module.exports.Command = Command

module.exports.commander = commander
module.exports.prompts = prompts
module.exports.chalk = chalk
module.exports.envinfo = envinfo
