const path = require("path");
const fs = require("fs");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.email
  let userFromCookie = users.find(user => user.email === req.cookies.email);

  if (userFromCookie) {
    req.session.usuarioLogueado = userFromCookie
  }

  if (req.session && req.session.usuarioLogueado) {
    res.locals.isLogged = true;
    res.locals.usuarioLogueado = req.session.usuarioLogueado
  }

  next();
}

module.exports = userLoggedMiddleware