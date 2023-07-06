const { response } = require("express")
const con = require("../../config/db/index.js")
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
                    projectname, starttime, endtime, require_meeting , note, next_meeting_id, report
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

    // user by assginment
    async getByTeacherId(id, result) {
        const teacherSQL = `SELECT * FROM meeting WHERE teacher_id = ${id};`

        try {
            const event = await this.executeQuery(teacherSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }

    }

    async getDataMeeting(meeting_id, result) {
        const meetingInfoSQL = `
            SELECT *
            FROM meeting
            JOIN groupstudent ON groupstudent.group_id = meeting.group_id
            WHERE meeting.meeting_id = ${meeting_id}
        `

        // 3 way to send API after execute query

        // Promise.all([this.executeQuery(meetingInfoSQL)])
        //     .then(([response]) => {
        //         result(response, null)
        //     })
        //     .catch(err => result(err))
        
        // this.executeQuery(meetingInfoSQL)
        //     .then(response => {
        //         result(response, null)
        //     })
        //     .catch(err => {
        //         result(null, err);
        //     })

        try {
            const response = await this.executeQuery(meetingInfoSQL)
            result(response)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
    
    getAllMeetings(data, result) { // data = req.session.user
        const responseData = {}

        const meetingSQL = `
            SELECT meeting.meeting_id, meeting.group_id, meeting.teacher_id, course_id, coursename, 
                    projectname, starttime, endtime, note, next_meeting_id, report
            FROM meeting
            INNER JOIN groupstudent ON groupstudent.group_id = meeting.group_id
        `
        const groupstudentSQL = `
            SELECT term, groupstudent.group_id, course_id
            FROM groupstudent
            
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

    getGeneralData(data, result) {
        const responseData = {}

        const termSQL = `SELECT DISTINCT term FROM groupstudent`

        const courseIdSQL = `SELECT DISTINCT course_id, term FROM groupstudent`


        Promise.all([this.executeQuery(termSQL), this.executeQuery(courseIdSQL)])
            .then(([termDB, courseIdDB]) => {
                responseData.termDB = termDB;
                responseData.courseIdDB = courseIdDB;
                result(responseData, null); // null indicates no error, passing the retrieved data (responseData) back to the caller
            })
            .catch((err) => {
                console.error('Error:', err);
                result(err);
            });
    }

    async createMeeting(result, meetingData, user) {
        const _this = this

        const tearcherId = user.teacher_id;

        const maxMeetingIdSQL = `
            SELECT meeting.meeting_id, meeting.group_id, meeting.teacher_id, meeting.starttime, meeting.endtime
            FROM meeting
            WHERE meeting.meeting_id = (
                SELECT MAX(meeting.meeting_id) 
                FROM meeting 
                WHERE meeting.group_id = ${meetingData.group_id}
                );
        `

        async function getMeetingInfo() {
            try {
                // executeQuery return Array so we neet to destructuring
                // this array by [meeting]
                const [meeting] = await _this.executeQuery(maxMeetingIdSQL)
                if (meeting) {
                    return meeting
                } else {
                    return null
                }

            } catch (err) {
                console.error('Error:', err);
                // throw err;
            }
        }

        const curMeetingData = await getMeetingInfo()
        console.log(curMeetingData)
        const next_meeting_id = curMeetingData.meeting_id + 1

        const insertTheFirstMeetingSQL = `
            INSERT INTO meeting 
                (meeting_id, 
                    group_id, 
                    teacher_id, 
                    starttime, 
                    endtime, 
                    reportdeadline, 
                    require_meeting, 
                    next_meeting_id, 
                    report)
            VALUES (
                '${(meetingData.group_id + '01')}', 
                '${meetingData.group_id}', 
                '${tearcherId}', 
                '${formatDate(meetingData.start_time)}', 
                '${formatDate(meetingData.end_time)}', 
                '${formatDate(meetingData.dl_report_time)}', 
                '${meetingData.require_meeting}', 
                NULL,   
                NULL
                );
        `

        const insertMeetingSQL = `
            INSERT INTO meeting 
                (meeting_id, 
                    group_id, 
                    teacher_id,
                    title, 
                    starttime, 
                    endtime, 
                    reportdeadline, 
                    require_meeting,
                    next_meeting_id, 
                    previous_meeting_id, 
                    report)
            VALUES (
                '${next_meeting_id}', 
                '${meetingData.group_id}', 
                '${tearcherId}', 
                '${meetingData.title}',
                '${formatDate(meetingData.start_time)}', 
                '${formatDate(meetingData.end_time)}', 
                '${formatDate(meetingData.dl_report_time)}', 
                '${meetingData.require_meeting}',
                NULL,   
                '${curMeetingData.meeting_id}', 
                NULL
                );
        `

        

        function formatDate(dateTime) {
            const year = dateTime.substring(0, 4)
            const month = dateTime.substring(5, 7)
            const date = dateTime.substring(8, 10)

            const hour = dateTime.substring(11, 13)
            const minutes = dateTime.substring(14, 16)

            return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":00"
        }

        if(curMeetingData.meeting_id) {
            Promise.all([_this.executeQuery(insertMeetingSQL)])
                .then(([insertData]) => {
                    result(insertData, null)
                })
                .catch((err) => {
                    console.log(err)
                    result(null, err);
                })
        } else {
            Promise.all([_this.executeQuery(insertTheFirstMeetingSQL)])
                .then(([insertData]) => {
                    result(insertData, null)
                })
                .catch((err) => {
                    console.log(err)
                    result(null, err);
                })
        }

    }

    //data = user ID
    async getAllEvents(user, result) {
        const _this = this

        const getEventSQL = `
            SELECT *
            FROM meeting
            INNER JOIN groupstudent ON groupstudent.group_id = meeting.group_id
            WHERE is_ended = 0 AND meeting.teacher_id = ${user.teacher_id}
        `

        try {
            const event = await _this.executeQuery(getEventSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }

    async endMeeting(data, result) {
        const _this = this

        const endMeetingSQL = `
            UPDATE meeting
            SET meeting.note = '${data.note}',
                meeting.is_ended = 1
            WHERE meeting.meeting_id = ${data.meeting_id} 
        `

        try {
            const meeting = await _this.executeQuery(endMeetingSQL)
            result(meeting)
        }
        catch(err) {
            console.error('Error: ', err)
            throw err
        }
    }

    async deleteMeeting(data, result) {
        const _this = this

        const deleteMeetingSQL = `
            DELETE
            FROM meeting
            WHERE meeting.meeting_id = ${data.meeting_id}
        `

        try {
            const event = await _this.executeQuery(deleteMeetingSQL)
            result(event)
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
}


module.exports = new Meeting()