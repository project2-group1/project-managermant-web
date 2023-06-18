const db = require("../../config/db/index.js")

var Meeting = function (meeting) {
    this.group_id = meeting.group_id
    this.course_id = meeting.course_id
    this.projectname = meeting.projectname
    this.coursename = meeting.coursename;
}

const executeQuery = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, res) {
            if(err) {
                console.error('Error executing query:', err)
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

Meeting.getById = function (meeting_id, result) {
    const responseData = {}

    let meetingSQL = `
        SELECT meeting.meeting_id, meeting.group_id, meeting.teacher_id, course_id, coursename, 
                projectname, starttime, endtime, note, next_meeting_id, report
        FROM meeting
        INNER JOIN groupstudent ON groupstudent.group_id = meeting.group_id
        WHERE meeting.meeting_id = ${meeting_id}
    `
    let groupstudentSQL = `
        SELECT fullname, student_id
        FROM groupstudent
        INNER JOIN student ON student.group_id = groupstudent.group_id
        WHERE groupstudent.group_id = ${meeting_id.substring(0,8)}
    `

    Promise.all([executeQuery(meetingSQL), executeQuery(groupstudentSQL)])
        .then(([meetingData, groupstudentData]) => {
            responseData.meeting = meetingData;
            responseData.groupstudent = groupstudentData;
            result(null, responseData);
        })
        .catch((err) => {
            console.error('Error:', err);
            result(err);
        });

}

Meeting.getAll = function ( result) {
    const responseData = {}

    let meetingSQL = `
        SELECT meeting.meeting_id, meeting.group_id, meeting.teacher_id, course_id, coursename, 
                projectname, starttime, endtime, note, next_meeting_id, report
        FROM meeting
        INNER JOIN groupstudent ON groupstudent.group_id = meeting.group_id
    `
    let groupstudentSQL = `
        SELECT fullname, student_id
        FROM groupstudent
        INNER JOIN student ON student.group_id = groupstudent.group_id
    `

    Promise.all([executeQuery(meetingSQL), executeQuery(groupstudentSQL)])
        .then(([meetingData, groupstudentData]) => {
            responseData.meeting = meetingData;
            responseData.groupstudent = groupstudentData;
            result(null, responseData);
        })
        .catch((err) => {
            console.error('Error:', err);
            result(err);
        });

}


module.exports = Meeting