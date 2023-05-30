const express = require('express');
const router = express.Router();

const SettingController = require('../app/controllers/SettingControllers');

router.get('/', SettingController.setting);

module.exports = router;
