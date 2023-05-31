class AssignmentController {
    // [GET] /news
    show(req, res, next) {
        res.render('assignments/assignment', {
            title: 'Báo cáo',
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

module.exports = new AssignmentController();
