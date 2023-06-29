const express = require('express');
const router = express.Router();

const MeController = require('../app/controllers/MeControllers');
const authMiddleware = require('../middlewares/Authorization.js');
const SettingController = require('../app/controllers/SettingControllers.js');

router.get('/setting', authMiddleware.loggedin, MeController.setting);
router.post('/changepassword', authMiddleware.loggedin, SettingController.changepassword);
router.get('/account', authMiddleware.loggedin, MeController.account);

module.exports = router;
