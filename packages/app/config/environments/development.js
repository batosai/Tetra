const path = require('path')
const app = require('../app')

module.exports = {
  server: {
    ext: 'js json pug css scss less styl',
    ignore: ['public/*', 'var/*'],
    stdout: true,
    scriptPosition: 1,
    // delay: 1 // default 1 seconde
    // delay: '2500ms' specify unit ms
    log: {
      stdout: path.join(process.cwd(), ...app.path.log, 'output.log'),
      stderr: path.join(process.cwd(), ...app.path.log, 'error.log')
    }
  }
}
