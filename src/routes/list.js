var express = require('express')
var router = express.Router()

const listController = require('../app/controllers/ListControllers.js')
// Thêm file exel
router.get('/importexcel', listController.importexcel)
//  thêm Student
router.get('/insertstudent', listController.insertStudent)
//  sửa Student
router.get('/editstudent', listController.editStudent)
//  xóa Student
router.get('/deletestudent', listController.deleteStudent)
// lấy ds theo kỳ học
router.get('/getterm', listController.getTerm)
//thêm excel
router.post('/importexcel', listController.importexcel)
// thêm nhóm
router.post('/addgroup', listController.addGroup)
// xóa nhóm
router.get('/deletegroup', listController.deleteGroup)
// sua nhom
router.post('/editgroup', listController.editGroup)
// tải trang
router.get('/', listController.show)


module.exports = router