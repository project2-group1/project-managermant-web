const Meeting = require('../models/Meeting.js')


class CalendarController {
    // [GET] /
    show(req, res, next) {
        res.render('calendar', {
            title: 'Lịch',
            css: [
                'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                '/css/calendar.css',
            ],
            libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
            handle: '/js/calendar.js',
        })
    }

    
}

module.exports = new CalendarController()
