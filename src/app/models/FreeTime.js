const { response } = require("express")
const con = require("../../config/db/index.js")
const db = require("../../config/db/index.js")
class FreeTime {

    constructor() {

    }

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
    
    async getByTeacherId(id, result) {
        const teacherSQL = `SELECT * FROM freetime WHERE teacher_id = ${id};`
        try {
            const event = await this.executeQuery(teacherSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }

    }
    
}


module.exports = new FreeTime()