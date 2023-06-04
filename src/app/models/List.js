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

List.instertGruop = function (group_id, projectname, coursecode, coursename, result) {
    connection.query(`
        INSERT INTO groupstudent
        (group_id, projectname, coursecode, coursename) 
        VALUES (${group_id}, ${projectname}, ${coursecode}, ${coursename});
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

List.getAll = function (result) {
    connection.query(
        `SELECT student_id, student.group_id, phonenumber, term, birthday, password, email, fullname, projectname, coursecode, coursename
        FROM student, groupstudent
        WHERE student.group_id = groupstudent.group_id
        ORDER BY term DESC 
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


List.findById = function (studentID, result) {
    connection.query(`
        SELECT student_id, student.group_id, phonenumber, term, birthday, password, email, fullname, projectname, coursecode, coursename
        FROM student, groupstudent
        WHERE student.group_id = groupstudent.group_id AND student.student_id = ${studentID}
        ORDER BY term DESC`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0])
            return;
        }
        result(null, null);
    });
}

module.exports = List;