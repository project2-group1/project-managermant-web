const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeControllers');

router.get('/setting', meController.setting);

module.exports = router;
