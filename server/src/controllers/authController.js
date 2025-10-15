const authService = require('../services/authService');

class AuthController {
  /**
   * 註冊會員
   */
  async register(req, res) {
    try {
      const { user, pwd, mail, currentTime } = req.body;
      const result = await authService.register(user, pwd, mail, currentTime);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 啟用會員資格
   */
  async verifyAccount(req, res) {
    try {
      const { validcode } = req.params;
      const result = await authService.verifyAccount(validcode);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 會員登入
   */
  async login(req, res) {
    try {
      const { user, pwd } = req.body;
      const result = await authService.login(user, pwd);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 驗證 Token
   */
  async verifyToken(req, res) {
    try {
      const { token } = req.body;
      const decoded = authService.verifyToken(token);
      res.json(decoded);
    } catch (error) {
      res.json(false);
    }
  }

  /**
   * 忘記密碼
   */
  async forgotPassword(req, res) {
    try {
      const { forget_user, forget_mail } = req.body;
      const result = await authService.forgotPassword(forget_user, forget_mail);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 取得忘記密碼驗證碼
   */
  async getResetCode(req, res) {
    try {
      const { forgetCode } = req.params;
      const result = await authService.verifyResetCode(forgetCode);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 更新密碼 (忘記密碼流程)
   */
  async resetPassword(req, res) {
    try {
      const { forget_user, forget_pwd } = req.body;
      const result = await authService.resetPassword(forget_user, forget_pwd);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }

  /**
   * 更改密碼 (已登入狀態)
   */
  async changePassword(req, res) {
    try {
      const { id, oldPwd, newPwd } = req.body;
      const result = await authService.changePassword(id, oldPwd, newPwd);
      res.json({ status: 'success', ...result });
    } catch (error) {
      res.json({ status: 'failed', message: error.message });
    }
  }
}

module.exports = new AuthController();
