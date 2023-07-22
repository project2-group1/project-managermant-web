const List = require('../models/List');
const Group = require('../models/Group');
const XLSX = require('xlsx');

class ListController {
    // [GET] /news
    show(req, res, next) {
        const user = req.session.user
        res.render('list/list', {
            title: 'Danh sách sinh viên',
            css: [
                '/css/list_student.css'
            ],
            handle: '/js/list_student.js',
            teacher: user.role == 'giang_vien',
        });
    }
    // [POST] /list/importexcel
    importexcel(req, res, next) {

    }
    // sửa
    editStudent(req, res, next) {
        const data=req.body;
        if (!Number(data.student_id)){
            res.send('mã sinh viên không hợp lệ');
            return;
        }
        List.editStudent(data.oldStudentId, data)
        .then(result => {
            res.send('số sinh viên đã sửa: ' + result.affectedRows)
        })
        .catch(err => {
            res.send('đã xảy ra lỗi' + err);
        });
    }
    // xóa
    deleteStudent(req, res, next) {
        const student_id = req.query.student_id;
        List.deleteStudent(student_id)
        .then(result => {
            res.send('số sinh viên đã xóa: ' + result.affectedRows)
        })
        .catch(err => {
            res.send('lỗi xóa sinh viên: ' + err);
        })
    }
    // thêm student
    insertStudent(req, res, next) {
        const data = req.body;
        if (!Number(data.student_id)){
            res.send('mã sinh viên không hợp lệ');
            return;
        }
        if (!data?.password) {
            data.password = '123456';
        }
        List.insertStudent(data)
        .then(result => {
            res.send('số sinh viên đã thêm: ' + result.affectedRows)
        })
        .catch(err => {
            res.send('đã xảy ra lỗi' + err);
        });
    }
    // them nhieu sinh vien
    insertStudents(req, res, next) {
        const data = req.body;
        console.log(typeof data);
        data.forEach(element => {
            element.password = '123456';
            List.insertStudent(element)
            .then(result => {})
            .catch(err => {})
        })
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
    // thêm nhiều nhóm bằng excel
    addGroups(req, res, next) {
        const data = req.body;
        console.log(typeof data);
        data.forEach(element => {
            Group.addGroup(element)
            .then(result => {

            })
            .catch(err => {

            });
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
