// const Course = require('../models/Course');
// const { mutipleMongooseToObject } = require('../../util/mongoose')
class AssignmentController {
    // [GET] /news
    show(req, res, next) {
        res.render('assignments/show');
    }
}

module.exports = new AssignmentController();
