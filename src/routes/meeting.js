var express = require('express')
var router = express.Router()
const meetingController = require('../app/controllers/MeetingController.js')
const authMiddleware = require('../middlewares/Authorization.js');

// router.get('/meeting', meetingController.getAllMeetings)
router.get('/meeting/api', meetingController.getDataMeetingByID)
router.get('/meeting/:id', authMiddleware.loggedin, meetingController.getMeetingById)
router.post('/create', authMiddleware.loggedin, meetingController.create)
router.get('/',authMiddleware.loggedin, meetingController.show)
router.put('/meeting/:id/end', meetingController.endMeeting)
router.delete('/meeting/:id/destroy', meetingController.deleteMeeting)
router.get('/meeting', meetingController.getMeetingById)
router.post('/create', meetingController.create)
router.get('/event/api', meetingController.getAllEvents)
router.get('/', meetingController.show)
    

module.exports = router
