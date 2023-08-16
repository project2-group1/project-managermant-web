const List = require('../models/List');
const Teacher = require('../models/Teacher');
class SettingController {
    // [GET] /calender
    show(req, res, next) {
        res.render('setting.hbs')
    }

    // [POST] /changepassword
    changepassword(req, res, next) {
        const old_passworddb = req.session.user.password;
        const old_password = req.body.old_password;
        const password = req.body.password;
        const password_confirmation = req.body.password_confirmation;
        const checkrole = req.session.user.teacher_id; // != null => teacher
        if (old_passworddb != old_password) {
            res.render('me/setting', {
                title: 'Đổi mật khẩu',
                css: [
                    '/css/setting.css',
                ],
                libraryJS: '/js/Validator.js',
                displayBtn: true,
                password: password,
                state: "Kiểm tra lại mật khẩu cũ!"
            });
        } else if (password != password_confirmation) {
            res.render('me/setting', {
                title: 'Đổi mật khẩu',
                css: [
                    '/css/setting.css',
                ],
                libraryJS: '/js/Validator.js',
                displayBtn: true,
                password: password,
                state: "Xác nhận mật khẩu sai!"
            });
        } else if (checkrole != null) {
            const id = req.session.user.teacher_id
            Teacher.updatePassword(id, password, function (data, err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.redirect("/");
                }
            })
        } else {
            const id = req.session.user.student_id
        }
    }

}

module.exports = new SettingController()