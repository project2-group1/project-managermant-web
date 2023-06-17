const List = require('../models/List');
const XLSX = require('xlsx');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class ListController {
    // [GET] /news
    show(req, res, next) {
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
        let kq;
        let student = {
            student_id: '202011',
            group_id: 1,
            fullname: 'Duong Kim Nam',
            password: '123',
            projectname: 'pj2',
            email: '123@email.com',
            phonenumber: 19008198,
            term: 20222,
            birthday: '2002-02-15'
        }
        if (kq = List.deleteStudent(student)) {
            kq.then(result => {
                res.send("Number of records inserted: " +
                result.affectedRows);     
            }).catch(err => {
                res.send(false);
            });
        }
        else {
            res.send(JSON.stringify(false));
        }
    }
    // thêm
    insertStudent(req, res, next) {
        let kq;
        let student = {
            student_id: '202011',
            group_id: 1,
            fullname: 'Duong Kim Nam',
            password: '123',
            projectname: 'pj2',
            email: '123@email.com',
            phonenumber: 19008198,
            term: 20222,
            birthday: '2002-02-15'
        }
        if (kq = List.insertStudent(student)) {
            kq.then(result => {
                res.send("Number of records inserted: " +
                result.affectedRows);     
            }).catch(err => {
                res.send(false);
            });
        }
        else {
            res.send(JSON.stringify(false));
        } 
    }
    // lấy ds theo kỳ học
    getTerm(req, res, next) {
        let term = req.query.term;
        let kq;
        if (kq = List.getTerm(term)) {
            kq.then(result => {
                res.send(JSON.stringify(result));        
            })
        }
        else {
            res.send(JSON.stringify(false));
        }

    }


}

module.exports = new ListController();
