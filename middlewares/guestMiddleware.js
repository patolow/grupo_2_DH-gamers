let guestMiddleware = (req, res, next ) => { 
    if (req.session.usuarioLogueado) {
        res.redirect('./profile');
    }
    next();
}

module.exports = guestMiddleware