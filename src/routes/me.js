const express = require('express');
const router = express.Router();

const MeController = require('../app/controllers/MeControllers');

router.get('/setting', MeController.setting);

module.exports = router;
