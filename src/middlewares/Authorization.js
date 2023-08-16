class Authorization {
    loggedin(req, res, next) {
        if (req.session.loggedin) {
            res.locals.user = req.session.user
            next();
        } else {
            res.redirect('/auth')
        }
    }

    isAuth(req, res, next) {
        if (req.session.loggedin) {
            res.locals.user = req.session.user
            res.redirect('/');
        } else {
            next();
        }
    }

}

module.exports = new Authorization();
