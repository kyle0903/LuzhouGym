const memberService = require('../services/memberService');

class MemberController {
  /**
   * 取得會員基本資料
   */
  async getBasicInfo(req, res) {
    try {
      const { id } = req.params;
      const result = await memberService.getBasicInfo(id);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 更新會員基本資料
   */
  async updateBasicInfo(req, res) {
    try {
      const { id } = req.params;
      const { gender, age, phone, address } = req.body;
      const result = await memberService.updateBasicInfo(id, { gender, age, phone, address });
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }
}

module.exports = new MemberController();
