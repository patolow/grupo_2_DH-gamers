let guestMiddleware = (req, res, next ) => { 
    if (req.session.usuarioLogueado != undefined) {
        res.send('ya logueado');
    }
    next();
}

module.exports = guestMiddleware