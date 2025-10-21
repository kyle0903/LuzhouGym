const { query } = require('../config/database');

class OrderModel {
  /**
   * 建立訂單
   */
  async create(orderData) {
    const sql = `INSERT INTO order_info(user_id, product_id, product_name, product_price, quantity, total, product_pic)
                 VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING cart_id`;
    const result = await query(sql, [
      orderData.userId,
      orderData.productId,
      orderData.productName,
      orderData.price,
      orderData.quantity,
      orderData.total,
      orderData.productPic,
    ]);
    return result[0].cart_id;
  }

  /**
   * 取得用戶的未付款訂單
   */
  async findUnpaidByUserId(userId) {
    const sql = `SELECT * FROM order_info
                 INNER JOIN member_info ON order_info.user_id = member_info.id
                 WHERE order_info.user_id = $1 AND order_info.pay = 0`;
    return await query(sql, [userId]);
  }

  /**
   * 刪除訂單
   */
  async deleteById(cartId) {
    const sql = 'DELETE FROM order_info WHERE cart_id = $1';
    await query(sql, [cartId]);
  }

  /**
   * 更新訂單付款狀態
   */
  async updatePaymentStatus(cartId, status = 1) {
    const sql = 'UPDATE order_info SET pay = $1 WHERE cart_id = $2';
    await query(sql, [status, cartId]);
  }

  /**
   * 根據購物車 ID 取得訂單
   */
  async findByCartId(cartId) {
    const sql = 'SELECT * FROM order_info WHERE cart_id = $1';
    const results = await query(sql, [cartId]);
    return results[0] || null;
  }
}

module.exports = new OrderModel();
