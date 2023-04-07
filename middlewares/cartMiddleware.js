// verifica si un usuario NO ha iniciado sesión lo manda a loguear

let cartMiddleware = (req, res, next) => {
  if (!req.session?.usuarioLogueado) {
    req.mustRedirect = true
  }
  next();
}

module.exports = cartMiddleware