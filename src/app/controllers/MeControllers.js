
class MeController {
    // [GET] /news
    setting(req, res, next) {
        res.render('me/setting', {
            title: 'Cài đặt',
            css: [
                '/css/form.css',
                '/css/app.css',
                '/fonts/fontawesome-free-6.4.0-web/css/all.css',
                '//cdn.quilljs.com/1.3.6/quill.snow.css',
            ],
            libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
            displayBtn: true,
        });
    }
}

module.exports = new MeController();
