const { Command } = require('../')
const { database, dotenv } = require('@tetrajs/core')
const repl = require("repl")

module.exports = class Console extends Command {
  configure() {
    this.name = 'console'
    this.alias = 'c'
    this.description = 'Tetra console'

    return super.configure()
  }

  async execute(args, options) {
    dotenv.config()
    database.mongodb.connection()

    const local = repl.start("tetra> ")
    local.context.database = database
    local.context.models = database.models
  }
}
