var express = require('express')
var router = express.Router()
const meetingController = require('../app/controllers/MeetingController.js')

router.route('/').get(meetingController.show)
// router.get('/:id', meetingController.getMeetingById2)

// router.get('/', meetingController.getAllMeetings2)
//     // .post('/',meetingController.createMeeting)

    

module.exports = router
