module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    // res.redirect(req.usersIndexSignInPath())
    res.redirect('/users/sign_in')
  }
}
