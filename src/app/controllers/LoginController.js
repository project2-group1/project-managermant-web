const { name } = require('ejs');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
class LoginController {

    showLoginForm(req, res, next) {
        res.render('auth/login', {
            layout: "login",
        });
    }

    //[POST] /auth/login
    async login(req, res, next) {
        let { role, id, password } = req.body;

        if (role == "giang_vien") {
            Teacher.getById(id, function (data, err) {
                if (err) {
                    res.redirect('/auth');
                } else {
                    // console.log(data);
                    let user = data[0];
                    user.role = role
                    if (data[0] && data[0].password == password) {
                        req.session.loggedin = true;
                        req.session.user = user;
                        // res.render()
                        res.redirect('/'); // send a param: role = teacher
                        console.log("Login success");
                    } else {
                        const conflictError = 'User credentials are not valid.';
                        res.redirect('/auth');
                    }
                }
            })
        }
        
        if(role == "sinh_vien") {
            Student.getById(id, function (data, err) {
                if(err) {
                    res.redirect('auth')
                } else {
                    console.log(data[0]);
                    let user = data[0]
                    user.role = role
                    if(data[0] && data[0].password == password) {
                        req.session.loggedin = true
                        req.session.user = user
                        res.redirect('/') // send a param: role = student
                    } else {
                        res.redirect('/auth')
                    }
                }
            })
        }
    }


    // [GET] logout
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) res.redirect('/500');
            res.redirect('/auth');
        })
    }
}

 module.exports = new LoginController();
