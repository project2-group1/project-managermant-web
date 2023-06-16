var express = require('express')
var router = express.Router()

const listController = require('../app/controllers/ListControllers.js')
// Thêm file exel
router.post('/importexcel', listController.importexcel)
//  thêm Student
router.post('/insertStudent', listController.insertStudent)
//  sửa Student
router.post('/editStudent', listController.editStudent)
//  xóa Student
router.post('/deleteStudent', listController.deleteStudent)
// lấy ds theo kỳ học
router.get('/getTerm', listController.getTerm)
// tải trang
router.get('/', listController.show)

module.exports = router