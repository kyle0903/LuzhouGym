const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// 取得會員基本資料
router.get('/basicmember/:id', memberController.getBasicInfo.bind(memberController));

// 更新會員基本資料
router.post('/update/:id', memberController.updateBasicInfo.bind(memberController));

module.exports = router;