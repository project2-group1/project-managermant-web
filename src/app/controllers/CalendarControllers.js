
class CalendarController {
    // [GET] /news
    index(req, res, next) {
        res.render('calendar', {
            title: 'Lịch',
            css: [
                'css/form.css',
                'css/app.css',
                '/fonts/fontawesome-free-6.4.0-web/css/all.css',
                'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
                '/css/calendar.css',
            ],
            libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
            handle: 'js/calendar.js',
        })
    }
}

module.exports = new CalendarController();
