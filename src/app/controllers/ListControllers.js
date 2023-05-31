const List = require('../models/List');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class ListController {
    // [GET] /news
    show(req, res, next) {
        List.getAll(function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(data);
                res.render('list/list', {
                    title: 'Danh sách sinh viên',
                    css: [
                        '/css/list_student.css'
                    ],
                    libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                    handle: '/js/list_student.js',
                    displayBtn: true,
                    list_student: data
                });
            }
        })


    }


}

module.exports = new ListController();
