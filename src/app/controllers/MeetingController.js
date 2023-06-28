// const Meeting = require('../models/Meeting.js')

class MeetingController {
    // [GET] /
    show(req, res, next) {
        res.render('meeting/meeting', {
            title: 'Cuộc hẹn',
            css: [
                '//cdn.quilljs.com/1.3.6/quill.snow.css',
                'css/meeting.css',
            ],
            libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
            handle: 'js/meeting.js',
            displayBtn: true,
        });
    }

    // [GET] /meeting/:id - Get meeting by id access though Model
    getMeetingById(req, res, next) {
        Meeting.getById(req.params.id, function (err, data) {
            if (err) {
                res.status(500).send(err)
            } else {
                // Check fetch data
                // res.send(data)
                // res.send(data.meeting)
                // res.send(data.groupstudent)

                // Render data
                res.render('meeting/meeting', {
                    title: 'Cuộc hẹn',
                    css: [
                        '//cdn.quilljs.com/1.3.6/quill.snow.css',
                        'css/meeting.css',
                    ],
                    libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                    handle: 'js/meeting.js',
                    displayBtn: true,
                    addMeeting: true,
                    meetings: data.meeting,
                    students: data.groupstudent,
                })
            }
        })
    }

    // [GET] /meeting
    getAllMeetings(req, res, next) {
        Meeting.getAll(function (err, data) {
            if (err) {
                res.status(500).send(err)
            } else {
                // Check fetch data
                // res.send(data)
                // res.send(data.meeting)
                // res.send(data.groupstudent)

                // Render data
                res.render('meeting/meeting', {
                    title: 'Cuộc hẹn',
                    css: [
                        '//cdn.quilljs.com/1.3.6/quill.snow.css',
                        'css/meeting.css',
                    ],
                    libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                    handle: 'js/meeting.js',
                    displayBtn: true,
                    addMeeting: true,
                    meetings: data.meeting,
                    students: data.groupstudent,
                })
            }
        })
    }
    
    
}

module.exports = new MeetingController();
