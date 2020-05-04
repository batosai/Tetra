module.exports = {
  name: 'database:model <module>',
  alias: 'db:model',
  action: (module, { env }) => {
    console.log('install ' + module + ' ' + env)
  }
}
