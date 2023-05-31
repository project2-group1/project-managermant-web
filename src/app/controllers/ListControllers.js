// const Course = require('../models/Course');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class ListController {
    // [GET] /news
    show(req, res, next) {
        res.render('list/list', {
            title: 'Danh sách sinh viên',
            css: [
                '/css/form.css',
                '/css/app.css',
                '/fonts/fontawesome-free-6.4.0-web/css/all.css',
                '//cdn.quilljs.com/1.3.6/quill.snow.css',
                '/css/list_student.css',
            ],
            libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
            handle: '/js/list_student.js',
            displayBtn: true,
        });
    }
}

module.exports = new ListController();
