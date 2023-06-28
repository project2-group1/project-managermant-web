const db = require("../../config/db/index.js")

class Teacher {

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
        const teacherSQL = `SELECT * FROM teacher WHERE teacher_id = ${id};`


        try {
            const event = await this.executeQuery(teacherSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }

    }


    static getAll() {
        let sql = "SELECT * FROM teacher;"

        return db.query(sql)
    }

}

module.exports = new Teacher()