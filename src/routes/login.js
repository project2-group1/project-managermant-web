var express = require('express')
var router = express.Router()

const LoginController = require('../app/controllers/LoginController.js')
const authMiddleware = require('../middlewares/Authorization.js');

router.post('/login', LoginController.login)
// router.get('/logout', LoginController.logout)
// router.get('/',  LoginController.showLoginForm)
router.get('/logout', authMiddleware.loggedin, LoginController.logout)
router.get('/', authMiddleware.isAuth, LoginController.showLoginForm)
module.exports = router