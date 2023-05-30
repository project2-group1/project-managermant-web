var express = require('express')
var router = express.Router()

const calendarController = require('../app/controllers/CalendarControllers.js')

router.get('/', calendarController.show)

module.exports = router