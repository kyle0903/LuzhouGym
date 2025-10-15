const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const linepayService = require('../utils/linepayService');

// 儲存訂單資訊 (用於 LINE Pay 確認時使用)
const pendingOrders = {};

class PaymentService {
  /**
   * 發起 LINE Pay 支付
   */
  async initiateLinePay(userId) {
    // 取得用戶的未付款訂單
    const orders = await orderModel.findUnpaidByUserId(userId);

    if (orders.length === 0) {
      throw new Error('購物車是空的');
    }

    // 組裝訂單資料
    const packages = [];
    let totalAmount = 0;

    orders.forEach(order => {
      packages.push({
        id: order.cart_id.toString(),
        amount: order.total,
        products: [
          {
            name: order.product_name,
            quantity: order.quantity,
            price: order.product_price,
          },
        ],
      });
      totalAmount += order.total;
    });

    const orderId = parseInt(new Date().getTime() / 1000);

    // 儲存訂單資訊
    pendingOrders[orderId] = {
      amount: totalAmount,
      packages,
    };

    // 發起 LINE Pay 支付請求
    const paymentResult = await linepayService.requestPayment({
      amount: totalAmount,
      orderId,
      packages,
    });

    return {
      success: true,
      urls: paymentResult.paymentUrl,
    };
  }

  /**
   * 確認 LINE Pay 支付
   */
  async confirmLinePay(transactionId, orderId) {
    const orderInfo = pendingOrders[orderId];

    if (!orderInfo) {
      throw new Error('訂單資訊不存在');
    }

    // 確認支付
    await linepayService.confirmPayment(transactionId, orderInfo.amount);

    // 更新產品庫存和訂單狀態
    for (const pkg of orderInfo.packages) {
      const product = pkg.products[0];

      // 減少產品數量
      await productModel.updateQuantity(product.name, product.quantity);

      // 更新訂單付款狀態
      await orderModel.updatePaymentStatus(pkg.id, 1);
    }

    // 清除已處理的訂單資訊
    delete pendingOrders[orderId];

    return {
      success: true,
      message: '訂單已成功付款，三秒後將導向首頁',
    };
  }
}

module.exports = new PaymentService();
