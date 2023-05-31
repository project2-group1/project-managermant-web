const Events = require('../models/Event.js')

class SettingController {
    // [GET] /calender
    show(req, res, next) {
        res.render('setting.hbs')
    }
}

module.exports = new SettingController()