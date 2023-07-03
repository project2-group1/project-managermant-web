const FreeTime = require('../models/FreeTime.js')
const Meeting = require('../models/Meeting.js')

class CalendarController {
    // [GET] /calender
    async show(req, res, next) {
        const id = req.session.user.teacher_id;
        console.log(id);
        FreeTime.getByTeacherId(id, function (data, err) {
            console.log(data);
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
                    handle: '/js/calendar.js',
                    data: responseData,
                })
            }
        })
    }
}
module.exports = new CalendarController()
