const express = require('express');
const router = express.Router();

const calendarController = require('../app/controllers/CalendarControllers');

router.get('/', calendarController.index);

module.exports = router;
