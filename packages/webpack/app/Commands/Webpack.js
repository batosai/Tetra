const path = require('path')
const { Command } = require('@tetrajs/cli')
const { webpack } = require('../..')

module.exports = class Webpack extends Command {
  configure() {
    this.name = 'webpack'
    this.description = 'Build assets app'
    this.app = { path: process.cwd() }

    return super.configure()
  }

  syntax() {
    console.log(
      this.kleur.green(`tetra <options> ${this.name} [build|watch]`),
    )
  }

  execute(args) {
    const config = require(path.join(this.app.path, 'config/webpack'))
    switch(args[0]) {
      case('watch'):
        process.stdin.resume()
        webpack.watch(config)
        break;
      case('build'):
      default:
        webpack.run(config)
    }
  }
}
