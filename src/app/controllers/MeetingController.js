const Meeting = require('../models/Meeting.js')

class MeetingController {

    // [GET] /
    async show(req, res, next) {
        try {
            const responseData = await new Promise((resolve, reject) => {
                Meeting.getEvent(null, function (data, err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            })
            // res.json(responseData)
            res.render('calendar.hbs', {
                title: 'Lịch',
                css: [
                    'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                    '/css/calendar.css',
                ],
                libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
                handle: '/js/calendar.js',
                data: responseData,
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }



    // [POST] /create -> redirect to /
    create(req, res, next) {
        Meeting.createMeeting(req.body, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            // res.json(req.body)
            res.redirect("/")
        })
    }

    // [GET] /meeting/:id - Get meeting by id access though Model
    getMeetingById(req, res, next) {
        Meeting.getById(req.params.id, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
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

        })
    }

    // [GET] /meeting
    getAllMeetings(req, res, next) {
        Meeting.getAll(function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
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

        })
    }

}

module.exports = new MeetingController();
