const connection = require('../../config/db/index');

var List = function (list) {
    this.student_id = list.student_id
    this.group_id = list.group_id
    this.phonenumber = list.phonenumber
    this.password = list.password
    this.email = list.email
    this.fullname = list.fullname
    this.projectname = list.projectname
    this.coursecode = list.coursecode
}

List.getAll = function (result){
    connection.query("SELECT * FROM student", function (err, res){
        if (err){
            console.log("Error: ", err);
            result(null, err);
        } else{
            console.log("Student: ", res.fullname);
            result(null, res);
        }
    })
}

module.exports = List;