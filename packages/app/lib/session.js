const {
  database,
  session,
  sessionFileStore,
} = require('@tetrajs/core')
const Db = require('./db')
const { config } = require('../')

class Session {
  static connect() {
    let store
    if (config.session.storeDriver === 'database') {
      const MongoStore = database.connectMongo(session)
      Db.connect()
      store = new MongoStore({ mongooseConnection: database.mongoose.connection })
    }
    else {
      const FileStore = sessionFileStore(session)
      store = new FileStore({
        path: path.join(appPath, 'var/sessions')
      })
    }

    return session({
      store,
      ...config.session
    })
  }
}

module.exports = Session
