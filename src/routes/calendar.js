var express = require('express')
var router = express.Router()

const calendarController = require('../app/controllers/CalendarController.js');
const authMiddleware = require('../middlewares/Authorization.js');

router.get('/', authMiddleware.loggedin, calendarController.show)

module.exports = router