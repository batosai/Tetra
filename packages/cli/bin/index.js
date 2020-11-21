#!/usr/bin/env node

'use strict'

const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const { Command } = require('../')

// Load commands modules installed
const { fetchFiles, fetchFilesInModules } = require('@tetrajs/core/lib/utils')

;(async () => {
  const program = new Command()
  const files = [
    ...(await fetchFiles(path.join(__dirname, '../app/Commands/**/*.js'))),
    ...(await fetchFilesInModules('app/Commands/**/*.js')),
  ]

  program.configure()
  try {
    for (const file of files) {
      const klass = require(file)
      const cmd = new klass()

      program.addCommand(cmd.configure())
    }
  } catch (e) {}

  if (!argv._.length) {
    program.render()
  } else {
    const modules = argv._
    delete argv._
    program.execute(modules, argv)
  }

})()
