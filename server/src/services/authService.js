const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const memberModel = require('../models/memberModel');
const verificationModel = require('../models/verificationModel');
const emailService = require('../utils/emailService');
const jwtService = require('../utils/jwtService');

class AuthService {
  /**
   * 會員註冊
   */
  async register(username, password, email, currentTime) {
    // 檢查用戶是否已存在
    const existingUser = await memberModel.findByUsername(username);
    if (existingUser) {
      throw new Error('該帳號已有人使用，或正在申請中，請重新輸入！');
    }

    // 加密密碼
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 建立會員
    const userId = await memberModel.create({
      username,
      password: hashedPassword,
      email,
      createDate: currentTime,
    });

    // 生成驗證碼
    const randomCode = crypto.randomBytes(32).toString('hex');
    await verificationModel.create(userId, randomCode);

    // 發送驗證信
    await emailService.sendVerificationEmail(email, randomCode);

    return { success: true, message: '已寄信至您的信箱，請前往認證會員帳號' };
  }

  /**
   * 啟用會員資格
   */
  async verifyAccount(verificationCode) {
    const verification = await verificationModel.findByCode(verificationCode);

    if (!verification) {
      throw new Error('該連結已過期');
    }

    // 更新會員驗證狀態
    await memberModel.updateVerificationStatus(verification.user_id);

    // 刪除驗證碼
    await verificationModel.deleteByUserId(verification.user_id);

    return { success: true, message: '已啟用會員資格，請重新登入' };
  }

  /**
   * 會員登入
   */
  async login(username, password) {
    const member = await memberModel.findByUsername(username);

    if (!member) {
      throw new Error('會員帳號並不存在，請先前往註冊');
    }

    // 驗證密碼
    const isPasswordValid = bcrypt.compareSync(password, member.password);
    if (!isPasswordValid || member.vertify === 0) {
      throw new Error('您輸入的帳號或密碼有誤，或是帳號還未經過認證');
    }

    // 生成 Token
    const token = jwtService.generateToken({
      id: member.id,
      user: member.user,
    });

    return {
      success: true,
      message: '登入中...',
      token,
      id: member.id,
    };
  }

  /**
   * 驗證 Token
   */
  verifyToken(token) {
    try {
      return jwtService.verifyToken(token);
    } catch (error) {
      return false;
    }
  }

  /**
   * 忘記密碼 - 發送重設信
   */
  async forgotPassword(username, email) {
    const member = await memberModel.findByUsernameAndEmail(username, email);

    if (!member) {
      throw new Error('查無此帳戶或信箱，請檢查是否帳戶或信箱輸入錯誤');
    }

    // 生成驗證碼
    const randomCode = crypto.randomBytes(32).toString('hex');
    await verificationModel.create(member.id, randomCode);

    // 發送重設密碼信
    await emailService.sendPasswordResetEmail(email, randomCode);

    return { success: true, message: '已將驗證碼寄至您的信箱，請麻煩前往認證' };
  }

  /**
   * 驗證忘記密碼驗證碼
   */
  async verifyResetCode(verificationCode) {
    const verification = await verificationModel.findByCode(verificationCode);

    if (!verification) {
      throw new Error('驗證碼無效或已過期');
    }

    const member = await memberModel.findById(verification.user_id);

    return { success: true, user: member.user };
  }

  /**
   * 更新密碼 (忘記密碼流程)
   */
  async resetPassword(username, newPassword) {
    const member = await memberModel.findByUsername(username);

    if (!member) {
      throw new Error('查無此會員');
    }

    // 刪除驗證碼
    await verificationModel.deleteByUserId(member.id);

    // 更新密碼
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await memberModel.updatePassword(member.id, hashedPassword);

    return { success: true, message: '密碼更改成功，三秒後進入登入頁面' };
  }

  /**
   * 更改密碼 (已登入狀態)
   */
  async changePassword(userId, oldPassword, newPassword) {
    const member = await memberModel.findById(userId);

    if (!member) {
      throw new Error('會員不存在');
    }

    // 驗證舊密碼
    const isOldPasswordValid = bcrypt.compareSync(oldPassword, member.password);
    if (!isOldPasswordValid) {
      throw new Error('舊密碼輸入錯誤');
    }

    // 更新密碼
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await memberModel.updatePassword(userId, hashedPassword);

    return { success: true, message: '密碼更改完成，請重新登入，3秒後將登出...' };
  }
}

module.exports = new AuthService();
