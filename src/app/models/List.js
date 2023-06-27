"use strict";
const connection = require('../../config/db/index');



class List {
    constructor(list) {
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
        this.list = list;
    }
    // Lấy ds sinh viên theo kỳ
    static getTerm(term) {
        // kiểm tra đầu vào
        let checkTerm = Number(term);
        // kiem tra dau vao khong phai so
        if (Number.isNaN(checkTerm)) {
            return false;
        }
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT student_id, student.group_id, phonenumber, term, birthday, password, email, fullname, projectname, course_id, coursename
                FROM student, groupstudent
                WHERE student.group_id = groupstudent.group_id
                and groupstudent.term = ${checkTerm}
                ORDER BY group_id DESC
                `, function (err, res) {
                if (err) {
                    console.log("Error getAll: ", err);
                    return;
                } else {
                    resolve(res);
                }
            })

        });
    }
    // Thêm 1 sinh viên
    static insertStudent(student) {
        let student_id = student?.student_id;
        let group_id = student?.group_id;
        let fullname = student?.fullname;
        let password = student?.password;
        let projectname = student?.projectname;
        let email = student?.email;
        let phonenumber = student?.phonenumber;
        let term = student?.term;
        let birthday = student?.birthday;

        //check student
        if (!student_id || !group_id || !fullname || !password ||
            !projectname || !email || !phonenumber || !term || !birthday) {
            return false;
        }

        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO student 
            VALUES(${student_id}, ${group_id}, '${fullname}',
            '${password}', '${projectname}', '${email}', 
            ${phonenumber}, ${term}, '${birthday}')`,
                function (err, res) {
                    if (err) {
                        console.log('Error Insert: ', err);
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
        })
    }
    // Thêm 1 nhóm sinh viên bằng import file excel
    static importExcel(groupStudents) {

    }
    // xóa 1 sinh viên
    static deleteStudent(student) {
        let student_id = student?.student_id;


        //check id student
        if (!student_id) {
            return false;
        }

        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM student 
            WHERE student_id = ${student_id}`,
                function (err, res) {
                    if (err) {
                        console.log('Error Insert: ', err);
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
        })
    }
    // sửa 1 sinh viên 
    static editStudent(student1, student) {
        let student1_id = student1?.student_id;

        let student_id = student?.student_id;
        let group_id = student?.group_id;
        let fullname = student?.fullname;
        let password = student?.password;
        let projectname = student?.projectname;
        let email = student?.email;
        let phonenumber = student?.phonenumber;
        let term = student?.term;
        let birthday = student?.birthday;

        //check student
        if (!student_id || !group_id || !fullname || !password ||
            !projectname || !email || !phonenumber || !term || !birthday) {
            return false;
        }

        return new Promise((resolve, reject) => {
            connection.query(`UPDATE student 
            SET student_id=${student_id}, group_id=${group_id}, fullname='${fullname}',
            password='${password}', projectname='${projectname}', email='${email}', 
            phonenumber=${phonenumber}, term=${term}, birthday='${birthday}'
            WHERE student_id=${student1_id}`,
                function (err, res) {
                    if (err) {
                        console.log('Error Insert: ', err);
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
        })
    }
}

// List.instertGruop = function (group_id, projectname, coursecode, coursename, result) {
//     connection.query(`
//         INSERT INTO groupstudent
//         (group_id, projectname, coursecode, coursename) 
//         VALUES (${group_id}, ${projectname}, ${coursecode}, ${coursename});
//         `, function (err, res) {
//         if (err) {
//             console.log("Error: ", err);
//             result(null, err);
//         } else {
//             // console.log("Student: ", res.fullname);
//             result(null, res);
//         }
//     })
// }

// List.getAll = function (result) {
//     connection.query(
//         `SELECT student_id, student.group_id, phonenumber, term, birthday, password, email, fullname, projectname, coursecode, coursename
//         FROM student, groupstudent
//         WHERE student.group_id = groupstudent.group_id
//         ORDER BY term DESC 
//         `, function (err, res) {
//         if (err) {
//             console.log("Error getAll: ", err);
//             result(null, err);
//         } else {
//             // console.log("Student: ", res.fullname);
//             result(null, res);
//         }
//     })
// }


// List.findById = function (studentID, result) {
//     connection.query(`
//         SELECT student_id, student.group_id, phonenumber, term, birthday, password, email, fullname, projectname
//         FROM student, groupstudent
//         WHERE student.group_id = groupstudent.group_id AND student.student_id = ${studentID}
//         ORDER BY term DESC`, (err, res) => {
//         if (err) {
//             result(err, null);
//             return;
//         }
//         if (res.length) {
//             result(null, res[0])
//             return;
//         }
//         result(null, null);
//     });
// }

module.exports = List;