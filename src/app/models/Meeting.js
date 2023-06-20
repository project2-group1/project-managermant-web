const db = require("../../config/db/index.js")
class Meeting {

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

    getById(meeting_id, result) {
        const responseData = {}

        const meetingSQL = `
            SELECT meeting.meeting_id, meeting.group_id, meeting.teacher_id, course_id, coursename, 
                    projectname, starttime, endtime, note, next_meeting_id, report
            FROM meeting
            INNER JOIN groupstudent ON groupstudent.group_id = meeting.group_id
            WHERE meeting.meeting_id = ${meeting_id}
        `
        const groupstudentSQL = `
            SELECT fullname, student_id
            FROM groupstudent
            INNER JOIN student ON student.group_id = groupstudent.group_id
            WHERE groupstudent.group_id = ${meeting_id.substring(0, 8)}
        `

        Promise.all([this.executeQuery(meetingSQL), this.executeQuery(groupstudentSQL)]) // .all to run multiples query
            .then(([meetingData, groupstudentData]) => { // return 2 object
                responseData.meeting = meetingData;
                responseData.groupstudent = groupstudentData;
                result(responseData, null); // null indicates no error, passing the retrieved data (responseData) back to the caller
            })
            .catch((err) => {
                console.error('Error:', err);
                result(err);
            });

    }

    getAll(result) {
        const responseData = {}

        const meetingSQL = `
            SELECT meeting.meeting_id, meeting.group_id, meeting.teacher_id, course_id, coursename, 
                    projectname, starttime, endtime, note, next_meeting_id, report
            FROM meeting
            INNER JOIN groupstudent ON groupstudent.group_id = meeting.group_id
        `
        const groupstudentSQL = `
            SELECT fullname, student_id
            FROM groupstudent
            INNER JOIN student ON student.group_id = groupstudent.group_id
        `

        Promise.all([this.executeQuery(meetingSQL), this.executeQuery(groupstudentSQL)])
            .then(([meetingData, groupstudentData]) => {
                responseData.meeting = meetingData;
                responseData.groupstudent = groupstudentData;
                result(responseData, null); // null indicates no error, passing the retrieved data (responseData) back to the caller
            })
            .catch((err) => {
                console.error('Error:', err);
                result(err);
            });
    }

    async createMeeting(data, result) {
        const _this = this

        const responseData = {}

        const meetingInfoSQL = `
            SELECT meeting.meeting_id, meeting.group_id, meeting.teacher_id, meeting.starttime, meeting.endtime
            FROM meeting
            WHERE meeting.meeting_id = (
                SELECT MAX(meeting.meeting_id) 
                FROM meeting 
                WHERE meeting.group_id = ${data.group_id}
                );
        `

        const insertMeetingSQL = `
            INSERT INTO meeting (meeting_id, group_id, teacher_id, starttime, endtime, reportdeadline, note, next_meeting_id, report)
            VALUES (
                '${ (await getMeetingInfo(data.group_id)).meeting_id + 1}', 
                '${data.group_id}', 
                '${(await getMeetingInfo(data.group_id)).teacher_id}', 
                '${formatDate(data.start_time)}', 
                '${formatDate(data.end_time)}', 
                '', 
                '${data.note}', 
                NULL,   
                NULL
                );
        `

        async function getMeetingInfo(group_id) {
            try {
                // executeQuery return Array so we neet to destructuring
                // this array by [meeting]
                const [meeting] = await _this.executeQuery(meetingInfoSQL) 
                return meeting
            } catch (err) {
                console.error('Error:', err);
                throw err;
            }
        }

        const next_meeting_id = (await getMeetingInfo(data.group_id)).meeting_id + 1
        console.log(next_meeting_id)

        function formatDate(dateTime) {
            const year = dateTime.substring(0,4)
            const month = dateTime.substring(5,7)
            const date = dateTime.substring(8,10)

            const hour = dateTime.substring(11,13)
            const minutes = dateTime.substring(14,16)

            return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":00"
        }

        console.log(data.start_time)
        console.log(formatDate(data.start_time))

        Promise.all([_this.executeQuery(insertMeetingSQL)])
            .then(([insertData]) => {
                result(insertData, null)
            }) 
            .catch((err) => {
                console.log(err)
                result(null, err);
            })
    }

    async getEvent(data, result) {
        const _this = this

        const responseData = {}

        const meetingInfoSQL = `
            SELECT *
            FROM meeting
            INNER JOIN groupstudent ON groupstudent.group_id = meeting.group_id
        `
        
        try {
            const event = await _this.executeQuery(meetingInfoSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }

    }
}


module.exports = new Meeting()