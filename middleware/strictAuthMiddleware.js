const JwtUtils = require('../utils/jwtUtils');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. 从请求头提取 token
    const token = JwtUtils.extractToken(req);
    
    if (!token) {
      return res.status(401).json({
            code:401,
            message:"未提供认证令牌"
        });
      // 未登录时不验证对象，返回用户id为1的数据
      // req.user = {
      //   id:1,
      //   username:"zhengsongrui"
      // }
      // next();
      // return false
    }

    // 2. 验证 token
    const decoded = JwtUtils.verifyToken(token);
    
    // 3. 将解码后的用户信息附加到请求对象
    req.user = decoded;
    // console.log(decoded)
    
    next();
  } catch (err) {
    console.log(err)
    // 处理不同的 JWT 错误
    let message = '认证失败';
    let status = 401;
    
    if (err.name === 'TokenExpiredError') {
      message = '令牌已过期';
      status = 401;
    } else if (err.name === 'JsonWebTokenError') {
      message = '无效令牌';
      status = 401;
    } else {
      message = '服务器错误';
      status = 500;
    }
    
    res.status(status).json({
        code:status,
        message,
    });
  }
};

module.exports = authMiddleware;