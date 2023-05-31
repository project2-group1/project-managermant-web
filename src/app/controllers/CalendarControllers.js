
class CalendarController {
    // [GET] /news
    index(req, res, next) {
        res.render('calendar', {
            title: 'Lịch',
            css: [
                '/css/form.css',
                '/css/calendar.css',
            ],
            libraryJS: 'https://cdn.jsdelivr.net/npm/flatpickr',
            handle: 'js/calendar.js',
        })
    }
}

module.exports = new CalendarController();
