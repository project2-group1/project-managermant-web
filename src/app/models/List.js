const connection = require('../../config/db/index');

var List = function (list) {
    this.student_id = list.student_id
    this.group_id = list.group_id
    this.phonenumber = list.phonenumber
    this.password = list.password
    this.term = list.term
    this.birthday = list.birthday
    this.coursename = list.coursename
    this.email = list.email
    this.fullname = list.fullname
    this.projectname = list.projectname
    this.coursecode = list.coursecode
}

List.getAll = function (result) {
    connection.query(
        `SELECT student_id, student.group_id, phonenumber, term, birthday, password, email, fullname, projectname, coursecode, coursename
        FROM student, groupstudent
        WHERE student.group_id = groupstudent.group_id
        `, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        } else {
            // console.log("Student: ", res.fullname);
            result(null, res);
        }
    })
}

module.exports = List;