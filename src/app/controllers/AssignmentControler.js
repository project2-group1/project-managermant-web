class AssignmentController {
    // [GET] /news
    show(req, res, next) {
        res.render('assignments/assignment', {
            title: 'Báo cáo',
            css: [
            ],
            libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
            displayBtn: true,
        });
    }
}

module.exports = new AssignmentController();
