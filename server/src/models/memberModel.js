const { query } = require('../config/database');

class MemberModel {
  /**
   * 根據用戶名查詢會員
   */
  async findByUsername(username) {
    const sql = 'SELECT * FROM member_info WHERE username = $1';
    const results = await query(sql, [username]);
    return results[0] || null;
  }

  /**
   * 根據 ID 查詢會員
   */
  async findById(id) {
    const sql = 'SELECT * FROM member_info WHERE id = $1';
    const results = await query(sql, [id]);
    return results[0] || null;
  }

  /**
   * 建立新會員
   */
  async create(userData) {
    const sql = 'INSERT INTO member_info(username, password, email, create_date, vertify) VALUES($1, $2, $3, $4, $5) RETURNING id';
    const result = await query(sql, [
      userData.username,
      userData.password,
      userData.email,
      userData.createDate,
      0, // 未驗證
    ]);
    return result[0].id;
  }

  /**
   * 更新會員驗證狀態
   */
  async updateVerificationStatus(userId, status = 1) {
    const sql = 'UPDATE member_info SET vertify = $1 WHERE id = $2';
    await query(sql, [status, userId]);
  }

  /**
   * 更新會員密碼
   */
  async updatePassword(userId, newPassword) {
    const sql = 'UPDATE member_info SET password = $1 WHERE id = $2';
    await query(sql, [newPassword, userId]);
  }

  /**
   * 根據用戶名和信箱查詢會員
   */
  async findByUsernameAndEmail(username, email) {
    const sql = 'SELECT * FROM member_info WHERE username = $1 AND email = $2';
    const results = await query(sql, [username, email]);
    return results[0] || null;
  }

  /**
   * 查詢會員基本資料
   */
  async findBasicInfo(userId) {
    const sql = 'SELECT * FROM member_basic_info WHERE user_id = $1';
    const results = await query(sql, [userId]);
    return results[0] || null;
  }

  /**
   * 建立會員基本資料
   */
  async createBasicInfo(userId) {
    const sql = 'INSERT INTO member_basic_info(user_id) VALUES($1)';
    await query(sql, [userId]);
    return this.findBasicInfo(userId);
  }

  /**
   * 更新會員基本資料
   */
  async updateBasicInfo(userId, data) {
    const sql = 'UPDATE member_basic_info SET age = $1, gender = $2, phone = $3, address = $4, updated_at = CURRENT_TIMESTAMP WHERE user_id = $5';
    await query(sql, [data.age, data.gender, data.phone || null, data.address || null, userId]);
  }

  /**
   * 刪除會員（用於註冊失敗回滾）
   */
  async deleteById(userId) {
    const sql = 'DELETE FROM member_info WHERE id = $1';
    await query(sql, [userId]);
  }
}

module.exports = new MemberModel();
