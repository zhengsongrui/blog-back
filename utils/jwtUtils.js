const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

class JwtUtils {
  /**
   * 生成 JWT token
   * @param {object} payload - 要存储在 token 中的数据
   * @param {string} expiresIn - 有效期 (默认 7d)
   * @returns {string} - JWT token
   */
  static generateToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }

  /**
   * 验证 JWT token
   * @param {string} token - JWT token
   * @returns {object} - 解码后的 token 数据
   * @throws {Error} - 如果 token 无效或过期
   */
  static verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }

  /**
   * 从请求头中提取 token
   * @param {object} req - Express 请求对象
   * @returns {string|null} - 提取的 token 或 null
   */
  static extractToken(req) {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    
    return null;
  }
}

module.exports = JwtUtils;