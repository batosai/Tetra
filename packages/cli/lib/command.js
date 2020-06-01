module.exports = class Command {
  constructor(prompts, chalk) {
    this.prompts = prompts
    this.chalk = chalk

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

  async execute(modules, options) {
    this.commands.map(async cmd => {
      if (cmd.name === modules[0] || cmd.alias === modules[0]) {
        if (options.h || options.help) {
          cmd.render()
        }
        else {
          cmd.execute(modules.slice(1) ,options)
        }
      }
    })
  }

  syntax() {
    if (this.name) {
      console.log(this.chalk.green(`tetra <options> ${this.name}`))
    } else {
      console.log(this.chalk.green('tetra <options> [command]'))
    }
  }


  formatted(name, description) {
    let maxLength = 0
    this.commands.map(cmd => {
      maxLength = maxLength > cmd.name.length ? maxLength : cmd.name.length
    })

    let separator = '.'.repeat(maxLength - name.length + 20)
    if (!description) {
      separator = ''
    }
    return this.chalk.dim(
      `  ${this.chalk.blueBright(name)}` +
      this.chalk.italic(
        ` ${separator} ${description}`
    ))
  }

  render() {
    this.syntax()

    if (this.description) {
      console.log(`${this.chalk.dim(this.description)}`)
    }

    if (this.alias) {
      console.log()
      console.log(this.chalk.yellow(`Alias: ${this.alias}`))
    }

    if (this.options.length) {
      console.log()
      console.log('Options:')
      this.options.map(opt => {
        console.log(this.formatted(opt.name, opt.description))
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
}
