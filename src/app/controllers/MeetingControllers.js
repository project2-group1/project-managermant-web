const Events = require('../models/Event.js')

class MeetingController {
    // [GET] /calender
    show(req, res, next) {
        res.render('meeting/meeting.hbs', {
            title: 'Cuộc gặp',
            css: [
                'css/form.css',
                'css/app.css',
                '/fonts/fontawesome-free-6.4.0-web/css/all.css',
                '//cdn.quilljs.com/1.3.6/quill.snow.css',
                'css/meeting.css',
            ],
            handle: 'meeting.js',
            libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
        })
    }
}

module.exports = new MeetingController()