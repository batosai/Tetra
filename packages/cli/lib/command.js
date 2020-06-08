module.exports = class Command {
  constructor() {
    const { prompts, kleur } = require('../')
    this.prompts = prompts
    this.kleur = kleur

    this.name = ''
    this.alias = ''
    this.description = ''
    this.options = []
    this.commands = []

    this.execute = this.execute.bind(this)
  }

  configure() {
    this.addOption('-h, --help', 'Display help for command')
    return this
  }

  async execute(args, options) {
    this.commands.map(async cmd => {
      if (cmd.name === args[0] || cmd.alias === args[0]) {
        if (options.h || options.help) {
          cmd.render()
        }
        else {
          cmd.execute(args.slice(1) ,options)
        }
      }
    })
  }

  syntax() {
    console.log()
    console.log('Usage:')
    if (this.name) {
      console.log(this.kleur.green(`tetra <options> ${this.name}`))
    } else {
      console.log(this.kleur.green('tetra <options> [command]'))
    }
  }


  formatted(name, description, initial='') {
    let maxLength = 0
    this.commands.map(cmd => {
      maxLength = maxLength > cmd.name.length ? maxLength : cmd.name.length
    })

    let separator = '.'.repeat(maxLength - name.length + 20)
    if (!description) {
      separator = ''
    }
    return this.kleur.dim(
      `  ${this.kleur.cyan(name)}` +
      this.kleur.italic(
        ` ${separator} ${description}`) +
      this.kleur.italic(
        this.kleur.yellow(initial ? `(default: ${initial})` : '')
    ))
  }

  render() {
    this.syntax()

    if (this.description) {
      console.log(`${this.kleur.dim(this.description)}`)
    }

    if (this.alias) {
      console.log()
      console.log(this.kleur.yellow(`Alias: ${this.alias}`))
    }

    if (this.options.length) {
      console.log()
      console.log('Options:')
      this.options.map(opt => {
        console.log(this.formatted(opt.name, opt.description, opt.default))
      })
    }

    if (this.commands.length) {
      console.log()
      console.log('Commands:')
      this.commands.map(cmd => {
        console.log(this.formatted(cmd.name, cmd.description))
      })
    }
    console.log()
  }

  addOption(name, description, initial=null) {
    this.options.push({
      name,
      description,
      default:initial
    })
  }

  addCommand(cmd) {
    this.commands.push(cmd)
  }

  table(obj) {
    const { Table } = require('../')
    return new Table(obj)
  }
}
