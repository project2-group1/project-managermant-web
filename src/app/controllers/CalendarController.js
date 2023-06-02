const Events = require('../models/Meeting.js')

class CalendarController {
    // [GET] /calender
    show(req, res, next) {
        res.render('calendar.hbs', {
            title: 'Lịch',
            css: [
                'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                'css/calendar.css',
            ],
            libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
            handle: 'js/calendar.js',
        })
    }
}

module.exports = new CalendarController()
