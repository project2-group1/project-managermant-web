var express = require('express')
var router = express.Router()
const meetingController = require('../app/controllers/MeetingController.js')


router.get('/meeting/:id', meetingController.getMeetingById)
router.get('/meeting', meetingController.getAllMeetings)
router.post('/create', meetingController.create)
router.get('/', meetingController.show)

    

module.exports = router
