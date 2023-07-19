const { name } = require('ejs');
const List = require('../models/List');
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

        let query;
        if (role == "giang_vien") {
            Teacher.getById(id, function (data, err) {
                if (err) {
                    res.redirect('/auth');
                } else {
                    // console.log(data);
                    const user = data[0];
                    if (data[0].password == password) {
                        req.session.loggedin = true;
                        req.session.user = user;
                        res.redirect('/?r=te'); // send a param: role = teacher
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
                    // console.log(data)
                    if(data[0].password == password) {
                        req.session.loggedin = true
                        req.session.user = data[0]
                        res.redirect('/?r=st') // send a param: role = student
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
