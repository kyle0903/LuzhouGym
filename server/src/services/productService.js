const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');

class ProductService {
  /**
   * 取得所有產品
   */
  async getAllProducts() {
    return await productModel.findAll();
  }

  /**
   * 加入購物車
   */
  async addToCart(cartData) {
    const total = cartData.price * cartData.quantity;

    await orderModel.create({
      userId: cartData.userId,
      productId: cartData.productId,
      productName: cartData.productName,
      price: cartData.price,
      quantity: cartData.quantity,
      total,
      productPic: cartData.productPic,
    });

    return { success: true };
  }

  /**
   * 取得購物車訂單
   */
  async getCart(userId) {
    return await orderModel.findUnpaidByUserId(userId);
  }

  /**
   * 取得購買記錄（已付款訂單）
   */
  async getPurchaseHistory(userId) {
    return await orderModel.findPaidByUserId(userId);
  }

  /**
   * 刪除購物車項目
   */
  async removeFromCart(cartId) {
    await orderModel.deleteById(cartId);
    return { success: true };
  }
}

module.exports = new ProductService();
