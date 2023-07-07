const List = require('../models/List');
const Teacher = require('../models/Teacher');
class MeController {
    // [GET] /news
    setting(req, res, next) {
        const password = req.session.user.password;
        console.log(password);
        res.render('me/setting', {
            title: 'Đổi mật khẩu',
            css: [
                '/css/setting.css',
            ],
            libraryJS: '/js/Validator.js',
            displayBtn: true
        });
    }
    //me//account
    async account(req, res, next) {
        console.log(req.session.user);
        const id = req.session.user.teacher_id;
        Teacher.getById(id, function (data, err) {
            if (err) {
                console.log("1");
                res.status(500).send(err);
            } else {
                console.log("2");
                res.render('me/account', {
                    title: 'Thông tin tài khoản',
                    css: [
                        '/css/account.css'
                    ],
                    libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                    displayBtn: true,
                    user: data
                });
            }
        })
    }

    settingUp(req, res, next) {
        console.log(req.body);
        res.render('calendar');
    }
}

module.exports = new MeController();
