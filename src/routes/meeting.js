var express = require('express')
var router = express.Router()
const meetingController = require('../app/controllers/MeetingController.js')
const authMiddleware = require('../middlewares/Authorization.js');

// router.get('/meeting', meetingController.getAllMeetings)
router.get('/meeting/api/general', meetingController.getGeneralData)
router.get('/meeting/api/all', meetingController.getAllMeetingsData)
router.get('/meeting/api/:id', meetingController.getDataMeetingByID)
router.post('/create', authMiddleware.loggedin, meetingController.create)
router.get('/',authMiddleware.loggedin, meetingController.show)
router.put('/meeting/reschedule/:id', meetingController.rescheduleMeeting)
router.get('/meeting/getreqaddmeeting', meetingController.getReqAddMeeting)
router.post('/meeting/reqaddmeeting/:id', meetingController.reqAddMeeting)
router.get('/meeting/reqchange/:id', meetingController.getRequestChangeMeeting)
router.put('/meeting/reqchange/:id', meetingController.requestChangeMeeting)
router.put('/meeting/acceptchange/:id', meetingController.acceptChangeMeeting)
router.put('/meeting/refusechange/:id', meetingController.refuseChangeMeeting)
router.post('/meeting/end/:id', meetingController.endMeeting)
router.delete('/meeting/delete/:id', meetingController.deleteMeeting)
router.get('/meeting/:id', authMiddleware.loggedin, meetingController.getMeetingById)
router.post('/create', meetingController.create)
router.get('/event/api', meetingController.getAllEvents)
router.get('/api/groupstudent', meetingController.getGroupStudent)
router.get('/', meetingController.show)
    

module.exports = router
