const db = require("../../config/db/index.js")

class Teacher {
    constructor(teacher) {
        this.teacher_id  = teacher?.teacher_id ;
        this.fullname = teacher?.fullname
        this.password = teacher?.password;
        this.address = teacher?.address;
        this.phonenumber = teacher?.phonenumber;
        this.email = teacher?.email;
    }

    static getAll() {
        let sql = "SELECT * FROM teacher;"

        return db.query(sql)
    }

    static getById(id) {
        let sql = `SELECT * FROM teacher WHERE teacher_id = ${id};`

        return db.query(sql)
    }
}

module.exports = new Teacher()