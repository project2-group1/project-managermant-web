// const Course = require('../models/Course');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class MeetingControler {
    // [GET] /news
    show(req, res, next) {
        res.render('meetings/show');
    }
}

module.exports = new MeetingControler();
