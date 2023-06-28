const db = require("../../config/db/index.js")

class Group {
    constructor(group) {
        this.group_id  = group?.group_id ;
        this.course_id = group?.course_id
        this.projectname = group?.projectname;
        this.coursename = group?.coursename;
        this.term = group?.term;
    }
    // Lấy tất cả nhóm
    static getAll() {
        let sql = "SELECT * FROM groupstudent;"

        return db.query(sql)
    }
    // Tìm nhóm theo tên
    static getGroupById(id) {
        let sql = `SELECT * FROM groupstudent WHERE group_id  = ${id};`

        return db.query(sql)
    }
    // lấy danh sách nhóm theo kì
    static getGroupsByTerm(term) {
        let checkTerm = Number(term);
        // kiem tra dau vao khong phai so
        if (Number.isNaN(checkTerm)) {
            return false;
        }
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT group_id, term, projectname, course_id, coursename
                FROM groupstudent
                WHERE term = ${checkTerm}
                ORDER BY group_id DESC
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
}

module.exports = Group;