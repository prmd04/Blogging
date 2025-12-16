const checkAuth = (req, res, next) => {
  res.locals.isAuth = Boolean(req.session && req.session.isAuth);
  next();
};

module.exports = checkAuth;