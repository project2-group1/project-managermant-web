// const Course = require('../models/Course');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    // [GET] /news
    show(req, res, next) {
        res.render('students/show');
    }
}

module.exports = new SiteController();
