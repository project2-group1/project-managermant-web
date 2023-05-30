const Events = require('../models/Event.js')

class ListController {
    // [GET] /calender
    show(req, res, next) {
        res.render('list.hbs')
    }
}

module.exports = new ListController()