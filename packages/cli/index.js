const prompts = require('prompts')
const kleur = require('kleur')
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

module.exports.prompts = prompts
module.exports.kleur = kleur
module.exports.envinfo = envinfo
