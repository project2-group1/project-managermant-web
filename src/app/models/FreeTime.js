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
    async create(id, start, end, result) {
        const _this = this;
        function formatDate(dateTime) {
            const year = dateTime.substring(0, 4)
            const month = dateTime.substring(5, 7)
            const date = dateTime.substring(8, 10)

            const hour = dateTime.substring(11, 13)
            const minutes = dateTime.substring(14, 16)

            return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":00"
        }
        const insert = `
        INSERT INTO freetime (teacher_id, starttime, endtime) 
        VALUES (${id}, 
            '${formatDate(start)}', 
            '${formatDate(end)}');
        `
        try {
            const event = await this.executeQuery(insert)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
}


module.exports = new FreeTime()