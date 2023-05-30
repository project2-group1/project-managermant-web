// const Course = require('../models/Course');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    // [GET] /news
    setting(req, res, next) {
        res.render('me/setting');
    }
}

module.exports = new SiteController();
