const Meeting = require('../models/Meeting.js')

class MeetingController {
 
    // [GET] /
    async show(req, res, next) {
        console.log(req.session.user)
        const user = req.session.user
        try {
            const responseData = await new Promise((resolve, reject) => {
                Meeting.getAllEvents(user, function (data, err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
            // console.log(responseData);
            res.render('calendar.hbs', {
                title: 'Lịch',
                css: [
                    'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                    '/css/calendar.css',
                ],
                libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
                handle: '/js/calendar.js',
                data: responseData,
                role: user.role,
                teacher: user.role == 'giang_vien',
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // [GET] /event/api/:r
    getAllEvents(req, res, next) {
        const user = req.session.user
        Meeting.getAllEvents(user, function (data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
        })
    }

    // [GET] /meeting/api/:id
    getDataMeetingByID(req, res ,next) {
        console.log(req.session.user)
        const user = req.session.user
        Meeting.getDataMeeting(req.query.id , function (data, err) {
            if(err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
            // res.json(data)
        })

    }

    // [GET] /meeting/:id - Get meeting by id access though Model
    getMeetingById(req, res, next) {
        const user = req.session.user
        Meeting.getById(req.query.id, function (data, err) {
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
                    '/css/meeting.css',
                ],
                libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
                handle: '/js/meeting.js',
                displayBtn: true,
                teacher: user.role == 'giang_vien',
                btnAddMeeting: true,
                meetings: data.meeting,
                students: data.groupstudent,
            })

        })
    }

    // [GET] /meeting/api/all
    getAllMeetingsData(req, res, next) {
        Meeting.getAllMeetings(req.session.user, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
            // res.send(data.meeting)
            // res.send(data.groupstudent)
        })
    }

    // [GET] /meeting/api/gerenal
    getGeneralData(req, res, next) {
        Meeting.getGeneralData(req.session.user, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
            // res.send(data.meeting)
            // res.send(data.groupstudent)
        })
    }

    // [POST] /create/ -> redirect to /
    create(req, res, next) {
        const user = req.session.user
        Meeting.createMeeting(function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.redirect('/')
        }, req.body, user)
        // res.json(req.body)
    }

    
    // [PUT] /meeting/:id/end
    endMeeting(req, res, next) {
        console.log(req.body);
        Meeting.endMeeting(req.body, function(data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            // res.redirect('/')
        })
        // res.json(req.body)
    }

    deleteMeeting(req, res, next) {

    }

    

}

module.exports = new MeetingController();
