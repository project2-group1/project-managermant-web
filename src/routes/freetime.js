var express = require('express')
var router = express.Router()

const freeTimeController = require('../app/controllers/FreeTimeController.js');
const authMiddleware = require('../middlewares/Authorization.js');

router.get('/',authMiddleware.loggedin,freeTimeController.show)
router.get('/api',authMiddleware.loggedin,freeTimeController.getFreeTime)

module.exports = router