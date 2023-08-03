const FreeTime = require('../models/FreeTime.js')
const Meeting = require('../models/Meeting.js')

class CalendarController {
    // [GET] /calender
    async show(req, res, next) {
        const role = req.query.r // role te = teacher / st = student
        const id = req.session.user.teacher_id;
        FreeTime.getByTeacherId(id, function (data, err) {
            if (err) {
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
                    teacher: role == 'te',
                })
            }
        })
    }
    // [GET] /freetime/api
    getFreeTime(req, res, next) {
        FreeTime.getByTeacherId(req.session.user, function (data, err) {
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
            res.redirect('/')
        })
    }

    // [GET] /freetime/:id/end
    delete(req, res, next) {
        const id = req.params.id;
        FreeTime.deleteById(id, function (data, err) {
            if (err) {
                res.status(500).send(err)
                return
            }
            res.redirect('/freetime')
        })
    }

}
module.exports = new CalendarController()
