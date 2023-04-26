function isAuthenticated(req, res, next) {
  if(!req.user) return res.redirect('/auth/google');
  next();
}

module.exports = isAuthenticated;