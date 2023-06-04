const List = require('../models/List');
class MeController {
    // [GET] /news
    setting(req, res, next) {
        res.render('me/setting', {
            title: 'Cài đặt',
            css: [
                '/css/form.css',
            ],
            libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
            displayBtn: true,
        });
    }

    account(req, res, next) {
        List.findById(20204843,function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(req.params);
                res.render('me/account', {
                    title: 'Thông tin tài khoản',
                    css: [
                        '/css/account.css'
                    ],
                    libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                    displayBtn: true,
                    id: data
                });
            }
        })
    }

    
    settingUp(req, res, next){
        console.log(req.body);
        res.render('calendar');
    }
}

module.exports = new MeController();
