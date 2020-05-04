module.exports = {
  name: 'install <module>',
  alias: 'i',
  action: (module, { env }) => {
    console.log('install ' + module + ' ' + env)
  }
}
