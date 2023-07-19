const Meeting = require('../models/Meeting.js')
class AssignmentController {
    // [GET] /news
    show(req, res, next) {
        const role = req.query.r // role te = teacher, st = student
        const id = req.session.user.teacher_id;
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
                    teacher: role == 'te',
                    data: data
                });
            }
        })
    }
}

module.exports = new AssignmentController();
