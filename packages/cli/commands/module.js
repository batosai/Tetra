module.exports = {
  name: 'install:module <module>',
  alias: 'i:m',
  action: (module, { env }) => {
    console.log('install ' + module + ' ' + env)
  }
}
