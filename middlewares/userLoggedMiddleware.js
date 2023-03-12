const express = require("express");
const db = require("../database/models")

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false
  if (req.session?.usuarioLogueado) {
    res.locals.isLogged = true
    res.locals.usuarioLogueado = req.session.usuarioLogueado
    return next()
  }

  const emailInCookie = req.cookies.email
  if(!emailInCookie) {
    return next()
  }

  let userFromCookie = db.User.findOne({
    where: {email: emailInCookie }
  }).then(userFromCookie => {
    if (userFromCookie) {
      userFromCookie = userFromCookie.dataValues
      req.session.usuarioLogueado = userFromCookie
    }
  }).catch(error => {
    console.log(error)
    next(res.status(500).send('Error al intentar loguearse.'))
  })
  next()
}

module.exports = userLoggedMiddleware