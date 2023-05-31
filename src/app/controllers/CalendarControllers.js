const Events = require('../models/Event.js')

class CalendarController {
    // [GET] /calender
    show(req, res, next) {
        res.render('calendar.hbs', {
            title: 'Lịch',
            css: [
                'css/app.css',
                '/fonts/fontawesome-free-6.4.0-web/css/all.css',
                'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                'css/calendar.css',
                'css/form.css'
            ],
            handle: 'calendar.js',
            libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
        })
    }
}
