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
        List.editStudent(data)
        .then(result => {
            List.edit_gr_st(data)
            .then(rs => {
                res.send('số sinh sinh viên đã sửa: ' + rs.affectedRows)
            })
        })
        .catch(err => {
            res.send('đã xảy ra lỗi' + err);
        });
    }
    // xóa
    deleteStudent(req, res, next) {
        const student_id = req.query.student_id;
        const group_id = req.query.group_id;
        List.delete_gr_st(student_id, group_id)
        .then(result => {
            List.deleteStudent(student_id, group_id)
            .then(result => {
                res.send('số sinh viên đã xóa: ' + result.affectedRows)
            })
            .catch(err => {
                res.send('lỗi xóa sinh viên: ' + err);
            })

        })
        .catch(err => {
            res.send('lỗi xóa liên kết: ' + err)
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
                List.gr_sv(data)
                .then(result => {
                    res.send('sv đã thêm: ' + result.affectedRows)
                })
                .catch(err => {
                    res.send('lỗi thêm liên két sinh viên - nhóm: ' + err);
                })
            })
            .catch(err => {
                res.send('lỗi thêm sv: ' + err);
                List.gr_sv(data)
                .then(result => {
                    res.send('số liên kết đã thêm: ' + result.affectedRows)
                })
                .catch(err => {
                    res.send('lỗi thêm liên két sinh viên - nhóm: ' + err);
                })
            });

        
    }
    // them nhieu sinh vien
    insertStudents(req, res, next) {
        const data = req.body;
        console.log(typeof data);
        data.forEach(element => {
            List.insertStudent(element)
            .then(result => {
                List.gr_sv(element)
                .then(result => {
                })
                .catch(err => {
                })
            })
            .catch(err => {
                List.gr_sv(element)
                .then(result => {
                })
                .catch(err => {
                })
            })
        })
    }
    // lấy ds nhóm và sinh viên theo kỳ học
    async getTerm(req, res, next) {
        const teacher_id = req.session.user.teacher_id;
        console.log(teacher_id);
        let term = req.query.term;
        // lấy ds nhóm
        let group = await Group.getGroupsByTerm(term, teacher_id);
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
        const teacher_id = req.session.user.teacher_id;
        const data = req.body;
        data.teacher_id=teacher_id;
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
        const teacher_id = req.session.user.teacher_id;
        const data = req.body;
        console.log(typeof data);
        data.forEach(element => {
            element.teacher_id=teacher_id;
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
            Group.edit_gr_st(data.oldGroupId, data)
            .then(rs => {
                res.send('Số nhóm đã sửa : ' + rs.affectedRows);
            })
        })
        .catch(err => {
            res.send('đã xảy ra lỗi' + err);
        });
    }


}

module.exports = new ListController();
