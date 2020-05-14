const mongoose = require('mongoose')

module.exports.connectMongo = require('connect-mongo')

module.exports.connexion = function() {
  mongoose.set('useUnifiedTopology', true)
  mongoose.Promise = global.Promise
  mongoose
    .connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
      },
    )
    .then(() => {
      console.log('Database connected')
    })
}
