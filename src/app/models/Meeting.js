// const db = require("../../config/db/index.js")

// class Meeting {
//     constructor(meeting) {
//         this.group_id = meeting.group_id;
//         this.course_id = meeting.course_id
//         this.projectname = meeting.projectname;
//         this.coursename = meeting.coursename;
//     }

//     static getAll() {
//         let sql = "SELECT * FROM meeting;"

//         return db.query(sql)
//     }

//     static getById() {
//         let sql = `SELECT * FROM meeting WHERE meeting_id ${id};`

//         return db.query(sql)
//     }
// }

// module.exports = new Meeting()