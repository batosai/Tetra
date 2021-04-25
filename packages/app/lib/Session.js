const {
  database,
  session,
  sessionFileStore,
} = require('@tetrajs/core')

const config = require('../config')

class Session {
  static connect() {
    let store
    if (config.session.storeDriver === 'database') {
      const MongoStore = database.connectMongo(session)
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
