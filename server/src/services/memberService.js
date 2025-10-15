const memberModel = require('../models/memberModel');

class MemberService {
  /**
   * 取得會員基本資料
   */
  async getBasicInfo(userId) {
    let basicInfo = await memberModel.findBasicInfo(userId);

    // 如果不存在，則建立
    if (!basicInfo) {
      basicInfo = await memberModel.createBasicInfo(userId);
    }

    return { success: true, result: basicInfo };
  }

  /**
   * 更新會員基本資料
   */
  async updateBasicInfo(userId, data) {
    await memberModel.updateBasicInfo(userId, data);
    return { success: true, message: '儲存完成' };
  }
}

module.exports = new MemberService();
