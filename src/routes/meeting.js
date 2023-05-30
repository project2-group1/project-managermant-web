const express = require('express');
const router = express.Router();

const MeetingControler = require('../app/controllers/MeetingControler');

router.get('/show', MeetingControler.show);

module.exports = router;