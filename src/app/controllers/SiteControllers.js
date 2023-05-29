// const Course = require('../models/Course');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    // [GET] /news
    index(req, res, next) {
        res.render('home')
    }
}

module.exports = new SiteController();
