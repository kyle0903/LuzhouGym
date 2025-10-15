const { query } = require('../config/database');

class VerificationModel {
  /**
   * 儲存驗證碼
   */
  async create(userId, randomCode) {
    // 先刪除舊的驗證碼
    await this.deleteByUserId(userId);

    const sql = 'INSERT INTO random_table(user_id, randomCode) VALUES(?, ?)';
    await query(sql, [userId, randomCode]);
  }

  /**
   * 根據驗證碼查詢
   */
  async findByCode(randomCode) {
    const sql = 'SELECT * FROM random_table WHERE randomCode = ?';
    const results = await query(sql, [randomCode]);
    return results[0] || null;
  }

  /**
   * 根據用戶 ID 刪除驗證碼
   */
  async deleteByUserId(userId) {
    const sql = 'DELETE FROM random_table WHERE user_id = ?';
    await query(sql, [userId]);
  }
}

module.exports = new VerificationModel();
