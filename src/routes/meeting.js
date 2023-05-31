var express = require('express')
var router = express.Router()

const meetingController = require('../app/controllers/MeetingController.js')

router.get('/', meetingController.show)

module.exports = router
