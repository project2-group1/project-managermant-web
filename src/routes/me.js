const express = require('express');
const router = express.Router();

const MeController = require('../app/controllers/MeControllers');
const authMiddleware = require('../middlewares/Authorization.js');

router.get('/setting', MeController.setting);
router.post('/ok', MeController.settingUp)
router.get('/account', authMiddleware.loggedin, MeController.account);

module.exports = router;
