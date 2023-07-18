const db = require("../../config/db/index.js")

class Student {

    constructor() {

    }
    // Thực thi câu lệnh SQL
    executeQuery(sql) {
        return new Promise((resolve, reject) => {
            db.query(sql, function (err, res) {
                if (err) {
                    console.error('Error executing query:', err)
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    async getById(id, result) {
        const studentGetByIdSQL = `SELECT * FROM student WHERE student_id = ${id};`

        try {
            const event = await this.executeQuery(studentGetByIdSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }

    }

    async updatePassword(id, password, result) {
        const studentChangePasswordSQL = `UPDATE student SET student.password = ${password} WHERE student_id = ${id};`


        try {
            const event = await this.executeQuery(studentChangePasswordSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }

    }

}

module.exports = new Student()