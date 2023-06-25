const { name } = require('ejs');
const List = require('../models/List');
const bcrypt = require('bcrypt');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class LoginController {
    // [GET] /login
    showLoginForm(req, res, next) {
        res.render('auth/login', { layout: "login" });
    }
    // [POST] /login
    login(req, res, next) {
        // rule = 0 sinh viên, rule = 1 giáo viên
        const { id, password, rule } = req.body;
        console.log(req.body);
        if (id && password) {
            List.findById(id, (err, user) => {
                console.log(user);
                if (!user) {
                    res.redirect('/auth')
                } else {
                    console.log("ok");
                    if (user.password == password) {
                        console.log('1');
                        console.log();
                        req.session.loggedin = true;
                        req.session.user = user;
                        res.redirect('/')
                        // res.render('calendar', { user, layout: "main" }); // trả về id '
                    } else {
                        // A user with that id address does not exists
                        const conflictError = 'User credentials are not valid.';
                        console.log('2');
                        res.redirect('/auth')
                    }
                }

            })
        } else {
            // A user with that id address does not exists
            const conflictError = 'User credentials are not valid.';
            res.render('/', { id, password, conflictError });
            console.log('3');
        }
    }
    // [GET] logout
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) res.redirect('/500');
            res.redirect('/auth');
        })
        // res.render('auth/login', { layout: "login" });
    }
}

module.exports = new LoginController();
