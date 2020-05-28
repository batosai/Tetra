const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
// const favicon = require('serve-favicon')

const appPath = process.cwd()

const { express, database, session, auth, dotenv, i18n } = require('@tetrajs/core')

const MongoStore = database.mongodb.connectMongo(session)
const app = express()
app.set('appPath', appPath)

dotenv.config()

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
    store
  })
)

app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())
app.use(helmet())

app.use(auth.passport.initialize())
app.use(auth.passport.session())

app.use(i18n)

const modules = require(`${appPath}`)
for (const key in modules) {
  app.use(key, modules[key])
}

module.exports = app
