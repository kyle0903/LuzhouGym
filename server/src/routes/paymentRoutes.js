const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// 發起 LINE Pay 支付
router.get('/linepay/:id', paymentController.initiateLinePay.bind(paymentController));

// 確認 LINE Pay 支付
router.post('/linepay/confirm', paymentController.confirmLinePay.bind(paymentController));

module.exports = router;
