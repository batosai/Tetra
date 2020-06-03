const { Command, envinfo } = require('../')
const packageJson = require(`${process.cwd()}/package.json`)

module.exports = class Informations extends Command {
  configure() {
    this.name = 'informations'
    this.alias = 'info'
    this.description = 'Show application informations'

    return super.configure()
  }

  execute() {
    console.log(this.kleur.bold('\nEnvironment Info:'))
    console.log(
      `\n  current version of ${packageJson.name}: ${packageJson.version}`,
    )
    console.log(`  running from ${process.cwd()}`)
    return envinfo
      .run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'npm', 'Yarn'],
          Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
          Databases: ['MongoDB']
          // npmPackages: packageJson.dependencies,
        },
        {
          duplicates: true,
          showNotFound: true,
        },
      )
      .then(console.log)
  }
}
