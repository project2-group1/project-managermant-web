// const Events = require('../models/Event.js')

class CalendarController {
    // [GET] /calender
    show(req, res, next) {
        // console.log(session.user);
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
