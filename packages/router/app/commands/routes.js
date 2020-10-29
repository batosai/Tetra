const { services } = require('@tetrajs/core')
const { Command } = require('@tetrajs/cli')
const { generatePrefix, capitalize } = require('../utils')

const { RoutesService } = services

module.exports = class Routes extends Command {
  configure() {
    this.name = 'routes'
    this.description = 'Routes app'
    this.app = { path: process.cwd() }

    this.addOption('-a, --all', 'Display all informations')

    return super.configure()
  }

  async execute(args, opts) {
    const routers = await RoutesService.get()
    const head = ['URI Pattern', 'Method', 'Middleware']

    if (opts.all || opts.a) {
      head.push('Controller#Action \nView path')
    }

    routers.forEach(router => {
      Object.keys(router).forEach(name => {
        const table = this.table({ head })
        console.log(this.kleur.green(`Module ${name}`))

        router[name].map(route => {
          const prefix = generatePrefix(
            name,
            `${route.action}${capitalize(route.name)}`,
          )
          const values = [route.route, route.method, prefix]

          if (opts.all || opts.a) {
            values.push(`${route.name}#${route.action}\n${route.defaultView}`)
          }

          table.push(values)
        })
        console.log(table.toString())
        console.log()
      })
    })
  }
}
