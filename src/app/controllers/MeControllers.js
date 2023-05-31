
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

}

module.exports = new MeController();
