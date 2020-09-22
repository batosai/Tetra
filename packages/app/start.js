const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
// const favicon = require('serve-favicon')
const {
  express,
  database,
  session,
  sessionFileStore,
  auth,
  i18n,
  services,
  event,
} = require('@tetrajs/core')
const { ModulesService } = services

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

let store
if (process.env.DATABASE_TYPE === database.MONGO_DB && process.env.SESSION_TYPE === 'database') {
  const MongoStore = database.mongodb.connectMongo(session)
  database.mongodb.connection()
  store = new MongoStore({ mongooseConnection: database.mongoose.connection })
}
else {
  const FileStore = sessionFileStore(session)
  store = new FileStore({
    path: path.join(appPath, 'var/sessions')
  })
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store,
  }),
)

app.use(express.static(path.join(appPath, 'public')))
app.use(compression())
app.use(helmet())

app.use(auth.passport.initialize())
app.use(auth.passport.session())

// Load modules and Middlewares
;(async () => {
  const mds = await ModulesService.get()

  app.use(i18n)

  for (const k in mds) {
    if (mds[k].namespace) {
      app.use(mds[k].namespace, require(mds[k].path))
    }
  }
})()

// Link modules installed
const pkg = require(`${appPath}/package.json`)
const pkgTetra = Object.keys(pkg.dependencies).filter(
  (module) => module !== '@tetrajs/app' && module.includes('@tetrajs/'),
)
spawn('npx', ['tetra', 'link', ...pkgTetra])

event.emit('tetra:init')

module.exports = app
