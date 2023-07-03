var express = require('express')
var router = express.Router()
const meetingController = require('../app/controllers/MeetingController.js')
const authMiddleware = require('../middlewares/Authorization.js');

// router.get('/meeting', meetingController.getAllMeetings)
router.get('/meeting/:id', authMiddleware.loggedin, meetingController.getMeetingById)
router.post('/create', authMiddleware.loggedin, meetingController.create)
router.get('/',authMiddleware.loggedin, meetingController.show)
    

module.exports = router
