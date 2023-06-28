const db = require("../../config/db/index.js")

class Meeting {
    constructor(meeting) {

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

    async getAll(result) {
        const teacherSQL = "SELECT * FROM meeting;"
        try {
            const event = await this.executeQuery(teacherSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }

    }

    async getById(id, result) {
        const teacherSQL = `SELECT * FROM meeting WHERE teacher_id = ${id};`


        try {
            const event = await this.executeQuery(teacherSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }

    }

    static getById(id) {
        let sql = `SELECT * FROM meeting WHERE meeting_id = ${id};`

        return db.query(sql)
    }
}

module.exports = new Meeting()