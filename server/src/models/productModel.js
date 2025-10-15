const { query } = require('../config/database');

class ProductModel {
  /**
   * 取得所有產品
   */
  async findAll() {
    const sql = 'SELECT * FROM product_info';
    return await query(sql);
  }

  /**
   * 根據 ID 取得產品
   */
  async findById(id) {
    const sql = 'SELECT * FROM product_info WHERE id = ?';
    const results = await query(sql, [id]);
    return results[0] || null;
  }

  /**
   * 根據名稱取得產品
   */
  async findByName(name) {
    const sql = 'SELECT * FROM product_info WHERE name = ?';
    const results = await query(sql, [name]);
    return results[0] || null;
  }

  /**
   * 更新產品數量
   */
  async updateQuantity(productName, quantity) {
    const sql = 'UPDATE product_info SET quantity = quantity - ? WHERE name = ?';
    await query(sql, [quantity, productName]);
  }
}

module.exports = new ProductModel();
