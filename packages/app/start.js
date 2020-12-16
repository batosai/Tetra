const path = require('path')
const fs = require('fs')
// const { spawn } = require('child_process')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
// const favicon = require('serve-favicon')
const Session = require('./lib/session')
const Resources = require('./lib/resources')
const {
  express,
  auth,
  i18n,
} = require('@tetrajs/core')

const appPath = process.cwd()

const app = express()
app.set('appPath', appPath)

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(appPath, 'var/log/access.log'),
  { flags: 'a' },
)
// TODO create a rotating write stream  https://github.com/expressjs/morgan
app.use(logger('combined', { stream: accessLogStream }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(Session.connect())
app.use(express.static(path.join(appPath, 'public')))
app.use(compression())
app.use(helmet())
app.use(auth.passport.initialize())
app.use(auth.passport.session())

// Load modules
;(async () => {
  // Load globals middlewares
  await Resources.middlewares(app)

  app.use(i18n)

  // Load tetra Modules
  await Resources.modules(app)
})()

// Link modules installed
// const pkg = require(`${appPath}/package.json`)
// const pkgTetra = Object.keys(pkg.dependencies).filter(
//   (module) => module !== '@tetrajs/app' && module.includes('@tetrajs/'),
// )
// spawn('npx', ['tetra', 'link', ...pkgTetra])

// event.emit('tetra:init')

module.exports = app
