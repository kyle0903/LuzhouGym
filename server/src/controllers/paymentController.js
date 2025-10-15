const paymentService = require('../services/paymentService');

class PaymentController {
  /**
   * 發起 LINE Pay 支付
   */
  async initiateLinePay(req, res) {
    try {
      const { id } = req.params;
      const result = await paymentService.initiateLinePay(id);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.status(500).json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 確認 LINE Pay 支付
   */
  async confirmLinePay(req, res) {
    try {
      const { transactionId, orderId } = req.body;
      const result = await paymentService.confirmLinePay(transactionId, orderId);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.status(500).json({ status: 'failed', message: error.message });
    }
  }
}

module.exports = new PaymentController();