var express = require('express')
var router = express.Router()

const calendarController = require('../app/controllers/CalendarController.js');
const authMiddleware = require('../middlewares/Authorization.js');

router.get('/',calendarController.show)

module.exports = router