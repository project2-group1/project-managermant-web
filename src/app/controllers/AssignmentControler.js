const Meeting = require('../models/Meeting.js')
class AssignmentController {
    // [GET] /news
    show(req, res, next) {
        const user = req.session.user
        const id = user.teacher_id;
        // phúc thêm lấy danh sách meeting theo mã sv hoặc mã nhóm;
        const student_id = req.query.student_id;
        const group_id = req.query.group_id;
        if (group_id)
        {
            Meeting.getGroupStudentByGrId(group_id, function (data, err) {
                console.log(data);
                if (err) {
                    console.log("1");
                    res.status(500).send(err);
                } else {
                    console.log("2");
                    res.render('assignments/assignment', {
                        title: 'Báo cáo',
                        css: [
                            '/css/view_assignments.css'
                        ],
                        libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                        teacher: user.role == 'giang_vien',
                        data: data
                    });
                }
            })
        } 
        else
        {
            Meeting.getByTeacherId(id, function (data, err) {
                console.log(data);
                if (err) {
                    console.log("1");
                    res.status(500).send(err);
                } else {
                    console.log("2");
                    res.render('assignments/assignment', {
                        title: 'Báo cáo',
                        css: [
                            '/css/view_assignments.css'
                        ],
                        libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                        teacher: user.role == 'giang_vien',
                        data: data
                    });
                }
            })
        }
    }
}

module.exports = new AssignmentController();
