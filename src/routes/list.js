const express = require('express');
const router = express.Router();

const ListController = require('../app/controllers/ListControllers');

router.get('/', ListController.show);

module.exports = router;
