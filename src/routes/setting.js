var express = require('express')
var router = express.Router()

const settingController = require('../app/controllers/SettingControllers.js')

router.get('/setting', settingController.show)
router.get('/', settingController.show)

module.exports = router