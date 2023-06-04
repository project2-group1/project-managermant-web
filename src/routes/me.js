const express = require('express');
const router = express.Router();

const MeController = require('../app/controllers/MeControllers');

router.get('/setting', MeController.setting);
router.post('/ok', MeController.settingUp)
router.get('/:id', MeController.account);

module.exports = router;
