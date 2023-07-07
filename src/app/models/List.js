"use strict";
const db = require('../../config/db/index');



class List {
    constructor(list) {
        // this.student_id = list.student_id
        // this.group_id = list.group_id
        // this.phonenumber = list.phonenumber
        // this.password = list.password
        // this.term = list.term
        // this.birthday = list.birthday
        // this.coursename = list.coursename
        // this.email = list.email
        // this.fullname = list.fullname
        // this.projectname = list.projectname
        // this.coursecode = list.coursecode
        // this.list = list;
    }
    // Lấy ds sinh viên theo nhóm
    static getStudentsByGroupId(groupId) {
        // kiểm tra đầu vào
        let checkGroupId = Number(groupId);
        // kiem tra dau vao khong phai so
        if (Number.isNaN(groupId)) {
            return false;
        }
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT student_id, group_id, fullname, phonenumber, birthday, email
                FROM student
                WHERE student.group_id = ${groupId}
                ORDER BY student_id DESC
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
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO student 
            VALUES(${student.student_id}, ${student.group_id}, '${student.fullname}',
            '${student.password}', '${student.email}', 
            ${student.phonenumber}, '${student.birthday}')`,
                function (err, res) {
                    if (err) {
                        console.log('Error Insert student: ', err);
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
    static deleteStudent(student_id) {
  

        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM student 
            WHERE student_id = ${student_id}`,
                function (err, res) {
                    if (err) {
                        console.log('Error delete student: ', err);
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
        })
    }
    // sửa 1 sinh viên 
    static editStudent(oldStudentId, newStudent) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE student 
            SET student_id=${newStudent.student_id}, group_id=${newStudent.group_id}, fullname='${newStudent.fullname}',
             email='${newStudent.email}', 
            phonenumber=${newStudent.phonenumber}, birthday='${newStudent.birthday}'
            WHERE student_id=${newStudent.oldStudentId}`,
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

module.exports = List;