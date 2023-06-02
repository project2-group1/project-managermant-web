const db = require("../../config/db.js")

class Meeting {
    constructor() {

    }

    create() {
        
    }

    findAll() {
        let sql = "SELECT * FROM meeting;"

        return db.query(sql)
    }

    findById() {
        let sql = `SELECT * FROM meeting WHERE meeting_id ${id};`

        return db.query(sql)
    }
}

module.exports = new Meeting()