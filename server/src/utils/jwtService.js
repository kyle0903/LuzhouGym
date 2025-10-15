const jwt = require('jsonwebtoken');
const config = require('../config/env');

class JwtService {
  /**
   * 生成 JWT Token
   */
  generateToken(payload) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  /**
   * 驗證 JWT Token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * 解碼 Token (不驗證)
   */
  decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = new JwtService();
