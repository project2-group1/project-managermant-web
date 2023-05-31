var express = require('express')
var router = express.Router()

const listController = require('../app/controllers/ListControllers.js')

router.get('/list', listController.show)
router.get('/', listController.show)

module.exports = router