const mongoose = require('mongoose')

module.exports.connectMongo = require('connect-mongo')

module.exports.connection = function () {
  mongoose.set('useUnifiedTopology', true)
  mongoose.Promise = global.Promise
  mongoose
    .connect(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
      },
    )
    .then(() => {
      console.log('Database connected')
    })
}
