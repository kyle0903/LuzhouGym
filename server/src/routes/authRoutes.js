const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 註冊會員
router.post('/sign', authController.register.bind(authController));

// 啟用會員資格
router.get('/signEnable/:validcode', authController.verifyAccount.bind(authController));

// 會員登入
router.post('/login', authController.login.bind(authController));

// 驗證 Token
router.post('/token', authController.verifyToken.bind(authController));

// 忘記密碼
router.post('/forgetPwd', authController.forgotPassword.bind(authController));

// 取得忘記密碼驗證碼
router.get('/getCode/:forgetCode', authController.getResetCode.bind(authController));

// 更新密碼 (忘記密碼流程)
router.post('/forgetPwdUpdate', authController.resetPassword.bind(authController));

// 更改密碼 (已登入狀態)
router.post('/changepwd', authController.changePassword.bind(authController));

module.exports = router;
