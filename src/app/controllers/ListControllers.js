// const Course = require('../models/Course');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class ListController {
    // [GET] /news
    show(req, res, next) {
        res.render('list/list.hbs');
    }
}

module.exports = new ListController();
