var express = require('express')
var router = express.Router()

const meetingController = require('../app/controllers/MeetingControllers.js')

// router.get('/meeting', meetingController.show)
router.get('/', meetingController.show)

module.exports = router
