const BaseController = require('@tetrajs/router').baseController
const bodyParser = require('body-parser')
const { security, auth } = require('@tetrajs/core')

const parseForm = bodyParser.urlencoded({ extended: false })
const authenticate = auth.passport.authenticate('local', {
  failureRedirect: '/users/sign_in',
  successRedirect: '/admin',
  failureFlash: true,
})

module.exports = class SignInController extends BaseController {
  constructor(...args) {
    super(...args)
    // this.middlewares = [
    //   { action: csrfProtection, only: 'index' },
    //   { actions: [csrfProtection], only: ['index'] },
    //   { actions: [csrfProtection], except: ['index'] }
    // ]
    this.middlewares = [
      { actions: [security.csrf.protection, security.csrf.token] },
      { actions: [parseForm, authenticate], only: 'create' },
    ]
  }

  async index(req, res, next) {
    if (req.user) {
      return res.redirect('/admin')
    } else {
      return res.render(req.usersIndexSignInView, {
        title: 'Login',
        // messages: req.flash('error'),
      })
    }
  }
}
