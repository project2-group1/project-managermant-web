
class SettingController {
    // [GET] /news
    setting(req, res, next) {
        res.render('setting/setting.hbs');
    }
}

module.exports = new SettingController();
