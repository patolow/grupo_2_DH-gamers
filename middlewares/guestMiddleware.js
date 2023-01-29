let guestMiddleware = (req, res, next ) => { 
    if (req.session.usuarioLogueado != undefined) {
        res.redirect('profile');
    }
    next();
}

module.exports = guestMiddleware