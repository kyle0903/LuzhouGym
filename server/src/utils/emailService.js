const nodemailer = require('nodemailer');
const config = require('../config/env');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.email.service,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  /**
   * 發送會員認證信
   */
  async sendVerificationEmail(email, randomCode) {
    const verificationUrl = `${config.appUrl}/login/${randomCode}`;
    const html = `
      <h2>蘆洲健身房會員認證</h2>
      <p>請點擊下方連結認證您的會員帳號：</p>
      <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        認證帳號
      </a>
      <p>或複製以下連結到瀏覽器：<br>${verificationUrl}</p>
    `;

    return this.sendEmail(email, '蘆洲健身房會員之信箱認證', html);
  }

  /**
   * 發送忘記密碼信
   */
  async sendPasswordResetEmail(email, randomCode) {
    const resetUrl = `${config.appUrl}/login/forgetPwd/${randomCode}`;
    const html = `
      <h2>蘆洲健身房密碼重設</h2>
      <p>請點擊下方連結重新設定您的密碼：</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">
        重設密碼
      </a>
      <p>或複製以下連結到瀏覽器：<br>${resetUrl}</p>
      <p style="color: #666; font-size: 12px;">如果您沒有要求重設密碼，請忽略此信件。</p>
    `;

    return this.sendEmail(email, '蘆洲健身房會員之忘記密碼認證', html);
  }

  /**
   * 通用發信方法
   */
  async sendEmail(to, subject, html) {
    try {
      const mailOptions = {
        from: config.email.user,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();
