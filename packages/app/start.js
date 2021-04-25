
// const { spawn } = require('child_process')

const Database = require('./lib/Database')
const Tetra = require('./lib/Tetra')

// // Link modules installed
// // const pkg = require(`${appPath}/package.json`)
// // const pkgTetra = Object.keys(pkg.dependencies).filter(
// //   (module) => module !== '@tetrajs/app' && module.includes('@tetrajs/'),
// // )
// // spawn('npx', ['tetra', 'link', ...pkgTetra])

// // event.emit('tetra:init')

Database.connect()

const tetra = new Tetra()
tetra.configure()

;(async () => {
  await tetra.initialize()
})()

module.exports = tetra.export()
