const List = require('../models/List');
const XLSX = require('xlsx');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class ListController {
    // [GET] /news
    show(req, res, next) {
        List.getTerm(20222);
        res.render('list/list', {
            title: 'Danh sách sinh viên',
            css: [
                '/css/list_student.css'
            ],
            handle: '/js/list_student.js',
            displayBtn: true,
        });
    }
    // [POST] /list/importexcel
    importexcel(req, res, next) {

    }
    // sửa
    editStudent(req, res, next) {

    }
    // xóa
    deleteStudent(req, res, next) {

    }
    // thêm
    insertStudent(req, res, next) {

    }
    // lấy ds theo kỳ học
    getTerm(req, res, next) {
        
    }


}

module.exports = new ListController();
