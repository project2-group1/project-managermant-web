const List = require('../models/List');
const XLSX = require('xlsx');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class ListController {
    // [GET] /news
    show(req, res, next) {
        List.getAll(function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                // console.log(data);
                res.render('list/list', {
                    title: 'Danh sách sinh viên',
                    css: [
                        '/css/list_student.css'
                    ],
                    handle: '/js/list_student.js',
                    displayBtn: true,
                    list_student: data
                });
            }
        })
    }
    // [POST] /list/importexcel
    importexcel(req, res, next) {
        console.log(req.body);
        res.redirect('')
    }


}

module.exports = new ListController();
