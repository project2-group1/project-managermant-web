var express = require('express')
var router = express.Router()

const listController = require('../app/controllers/ListControllers.js');
const authMiddleware = require('../middlewares/Authorization.js');

// Thêm file exel
router.get('/importexcel', authMiddleware.loggedin, listController.importexcel)
//  thêm Student
router.get('/insertstudent', authMiddleware.loggedin, listController.insertStudent)
//  sửa Student
router.get('/editstudent', authMiddleware.loggedin, listController.editStudent)
//  xóa Student
router.get('/deletestudent', authMiddleware.loggedin, listController.deleteStudent)
// lấy ds theo kỳ học
router.get('/getterm', authMiddleware.loggedin, listController.getTerm)
//thêm excel
router.post('/importexcel', authMiddleware.loggedin, listController.importexcel)
// thêm nhóm
router.post('/addgroup', authMiddleware.loggedin, listController.addGroup)
// xóa nhóm
router.get('/deletegroup', authMiddleware.loggedin, listController.deleteGroup)
// sua nhom
router.post('/editgroup', authMiddleware.loggedin, listController.editGroup)
// tải trang
router.get('/', authMiddleware.loggedin, listController.show)


module.exports = router