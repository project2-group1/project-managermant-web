var express = require('express')
var router = express.Router()

const freeTimeController = require('../app/controllers/FreeTimeController.js');
const authMiddleware = require('../middlewares/Authorization.js');

router.get('/',authMiddleware?.loggedin,freeTimeController.show);
router.get('/:id/ok', freeTimeController.delete)
router.get('/api',authMiddleware.loggedin,freeTimeController.getFreeTime);
router.post('/create',authMiddleware.loggedin,freeTimeController.create);

module.exports = router