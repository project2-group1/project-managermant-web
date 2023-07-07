const express = require('express');
const router = express.Router();

const StudentController = require('../app/controllers/AssignmentControler');
const authMiddleware = require('../middlewares/Authorization.js');

router.get('/', authMiddleware.loggedin, StudentController.show);

module.exports = router;