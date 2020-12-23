const {
  database,
} = require('@tetrajs/core')
const { config } = require('../')

class Db {
  static connect() {
    database.mongoose.set('useUnifiedTopology', true)
    database.mongoose.Promise = global.Promise
    database.mongoose
      .connect(
        `mongodb://${config.database.mongo.connection.host}:${config.database.mongo.connection.port}/${config.database.mongo.connection.name}`,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
        },
      )
      .then(() => {
        console.log('Database connected')
      })
  }
}

module.exports = Db
