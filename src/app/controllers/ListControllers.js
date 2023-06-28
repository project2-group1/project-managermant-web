const List = require('../models/List');
const Group = require('../models/Group');
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
        let kq;
        let student1 = {
            student_id: '202011',
            group_id: 1,
            fullname: 'Duong Nam Kim',
            password: '123',
            projectname: 'pj2',
            email: '123@email.com',
            phonenumber: 19008198,
            term: 20222,
            birthday: '2002-02-15'
        }
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
        if (kq = List.editStudent(student, student1)) {
            kq.then(result => {
                res.send("Number of records edited: " +
                result.affectedRows);     
            }).catch(err => {
                res.send(false);
            });
        }
        else {
            res.send(JSON.stringify(false));
        } 
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
    // lấy ds nhóm và sinh viên theo kỳ học
    async getTerm(req, res, next) {
        let term = req.query.term;
        // lấy ds nhóm
        let group = await Group.getGroupsByTerm(term);
        if (group) {
        let size = group.length;
        // thêm sinh viên ứng với nhóm
        for (let i = 0; i < size; i++) {
            group[i].students = await List.getStudentsByGroupId(group[i].group_id);
        }

            res.send(JSON.stringify(group));        
        }
        else {
            res.send(JSON.stringify(false));
        }

    }
    // thêm nhóm
    addGroup(req, res, next) {
        const data = req.body;
        if (!Number(data.group_id)){
            res.send('mã nhóm không hợp lệ');
            return;
        }
        Group.addGroup(data)
        .then(result => {
            res.send('số nhóm đã thêm: ' + result.affectedRows)
        })
        .catch(err => {
            res.send('đã xảy ra lỗi' + err);
        });
    }
    // xóa nhóm
    deleteGroup(req, res, next) {
        const group_id = req.query.group_id;
        Group.deleteGroup(group_id)
        .then(result => {
            res.send('số nhóm đã xóa: ' + result.affectedRows)
        })
        .catch(err => {
            res.send('lỗi xóa nhóm: ' + err);
        })
    }
    // sua nhom
    editGroup(req, res, next) {
        const data=req.body;
        if (!Number(data.group_id)){
            res.send('mã nhóm không hợp lệ');
            return;
        }
        Group.editGroup(data.oldGroupId, data)
        .then(result => {
            res.send('số nhóm đã sửa: ' + result.affectedRows)
        })
        .catch(err => {
            res.send('đã xảy ra lỗi' + err);
        });
    }


}

module.exports = new ListController();
