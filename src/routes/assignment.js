const express = require('express');
const router = express.Router();

const StudentController = require('../app/controllers/AssignmentControler');

router.get('/show', StudentController.show);

module.exports = router;