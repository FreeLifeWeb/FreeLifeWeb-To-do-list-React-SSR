const isAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/reg');
  }
  next();
};

export default isAuth;
