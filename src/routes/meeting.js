var express = require('express')
var router = express.Router()
const meetingController = require('../app/controllers/MeetingController.js')


// router.get('/meeting', meetingController.getAllMeetings)
router.post('/meeting/end', meetingController.endMeeting)
router.get('/meeting/api', meetingController.getDataMeetingByID)
router.get('/meeting', meetingController.getMeetingById)
router.post('/create', meetingController.create)
router.get('/event/api', meetingController.getAllEvents)
router.get('/', meetingController.show)
    

module.exports = router
