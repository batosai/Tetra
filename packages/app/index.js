const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
// const favicon = require('serve-favicon')

const appPath = process.cwd()

// const config = require(`${appPath}/config`)
// global.config = config

// const tetra = require('@tetrajs/launcher')
const { express, database, session, passport, dotenv } = require('@tetrajs/core')

const MongoStore = database.mongodb.connectMongo(session)

// const theme = require('./themes/test')
const app = express()

dotenv.config()

// TODO refacto mongo in module database
// mongoose.set('useUnifiedTopology', true)
// mongoose.Promise = global.Promise
// mongoose
//   .connect(
//     `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
//     {
//       useCreateIndex: true,
//       useNewUrlParser: true,
//     },
//   )
//   .then(() => {
//     console.log('Database connected')
//   })

// tetra.configure({
//   ...config,
//   path: __dirname,
//   publicPath: path.join(__dirname, 'public/')
// })

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
if (process.env.DB_TYPE === database.MONGO_DB) {
  database.mongodb.connexion()
  store = new MongoStore({ mongooseConnection: database.mongoose.connection })
}

// app.use(
//   session({
//     secret: config.session.secret,
//     resave: true,
//     saveUninitialized: true,
//     store
//   })
// )

app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())
app.use(helmet())

app.use(passport.initialize())
app.use(passport.session())
// app.use(tetra)

// app.use('/', theme)

module.exports = app
