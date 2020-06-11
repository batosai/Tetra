const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
// const favicon = require('serve-favicon')
const { express, database, session, auth, i18n } = require('@tetrajs/core')
const { webpack } = require('@tetrajs/webpack')

const appPath = process.cwd()

const MongoStore = database.mongodb.connectMongo(session)
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
if (process.env.DATABASE_TYPE === database.MONGO_DB) {
  database.mongodb.connection()
  store = new MongoStore({ mongooseConnection: database.mongoose.connection })
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store,
  }),
)

app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())
app.use(helmet())

app.use(auth.passport.initialize())
app.use(auth.passport.session())

// Load tetra modules
app.use(i18n)

// Load modules installed
const modules = require(`${appPath}`)
for (const key in modules) {
  app.use(key, modules[key])
}

// Link modules installed
const pkg = require(`${appPath}/package.json`)
const pkgTetra = Object.keys(pkg.dependencies).filter(
  (module) => module !== '@tetrajs/app' && module.includes('@tetrajs/'),
)
spawn('npx', ['tetra', 'link', ...pkgTetra])

// run webpack
webpack.run([require(`${appPath}/app/config/webpack.js`)])

module.exports = app
