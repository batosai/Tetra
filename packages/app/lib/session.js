const {
  database,
  session,
  sessionFileStore,
} = require('@tetrajs/core')


class Session {
  static connect() {
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

    return session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      store,
    })
  }
}

module.exports = Session
