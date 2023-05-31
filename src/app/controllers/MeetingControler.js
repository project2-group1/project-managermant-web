class MeetingControler {
    // [GET] /news
    show(req, res, next) {
        res.render('meetings/meeting', {
            title: 'Cuộc hẹn',
            css: [
                'css/form.css',
                'css/app.css',
                '/fonts/fontawesome-free-6.4.0-web/css/all.css',
                '//cdn.quilljs.com/1.3.6/quill.snow.css',
                '/css/meeting.css',
            ],
            libraryJS: '//cdn.quilljs.com/1.3.6/quill.min.js',
            handle: 'js/meeting.js',
            displayBtn: true,
        });
    }
}

module.exports = new MeetingControler();
