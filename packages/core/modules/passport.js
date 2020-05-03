const passport = require('passport')
const localStrategy = require('passport-local').Strategy

// const { User } = require('@tetra/core').models

passport.use(
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      // User.findOne({ username }, (err, user) => {
      //   if (err) throw err

      //   if (!user) {
      //     return done(null, false, {
      //       message: 'Missing username or password.',
      //     })
      //   }

      //   user.comparePassword(password, (err, isMatch) => {
      //     if (err) throw err
      //     if (isMatch) {
      //       return done(null, user)
      //     }
      //     return done(null, false, {
      //       message: 'Missing username or password.',
      //     })
      //   })
      // })

      return done(null, false, {
        message: 'Missing username or password.',
      })
    },
  ),
)

//FOR SESSION
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

module.exports = passport
