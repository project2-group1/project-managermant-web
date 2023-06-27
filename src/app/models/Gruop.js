const db = require("../../config/db/index.js")

class Group {
    constructor(group) {
        this.group_id  = group?.group_id ;
        this.course_id = group?.course_id
        this.projectname = group?.projectname;
        this.coursename = group?.coursename;
        this.term = group?.term;
    }

    static getAll() {
        let sql = "SELECT * FROM groupstudent;"

        return db.query(sql)
    }

    static getById(id) {
        let sql = `SELECT * FROM groupstudent WHERE group_id  = ${id};`

        return db.query(sql)
    }
}

module.exports = new Group()