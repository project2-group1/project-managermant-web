var express = require('express')
var router = express.Router()

const listController = require('../app/controllers/ListControllers.js')

<<<<<<< HEAD
router.get('/list', listController.show)
router.post('/importexcel', listController.importexcel)
=======
>>>>>>> f857a7ca078bb22dda23706e1a11cc6463e0c603
router.get('/', listController.show)

module.exports = router