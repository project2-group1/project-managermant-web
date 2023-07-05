const FreeTime = require('../models/FreeTime.js')
const Meeting = require('../models/Meeting.js')

class CalendarController {
    // [GET] /calender
    async show(req, res, next) {
        const id = req.session.user.teacher_id;
        FreeTime.getByTeacherId(id, function (data, err) {
            if (err) {
                console.log("1");
                res.status(500).send(err);
            } else {
                // res.json(responseData)
                const responseData = data;
                res.render('freetime/freetime', {
                    title: 'Lịch',
                    css: [
                        'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                        '/css/calendar.css',
                    ],
                    libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
                    handle: '/js/freetime.js',
                    data: responseData,
                })
            }
        })
    }
    // [GET] /freetime/api
    getFreeTime(req, res, next) {
        const id = req.session.user.teacher_id;
        FreeTime.getByTeacherId(id, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.send(data)
        })
    }
    // [POST] /freetime/create
    create(req, res, next) {
        const id = req.session.user.teacher_id;
        const start = req.body.start_time;
        const end = req.body.end_time;
        FreeTime.create(id, start, end, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.redirect('/freetime')
        })
    }

}
module.exports = new CalendarController()
