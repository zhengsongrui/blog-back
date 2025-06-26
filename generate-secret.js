// generate-secret.js
const crypto = require('crypto');

// 生成 64 字节 (512 位) 的强随机密钥
const generateJwtSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const jwtSecret = generateJwtSecret();
console.log('生成的 JWT_SECRET:', jwtSecret);
console.log('\n请复制此密钥到你的 .env 文件:');
console.log(`JWT_SECRET=${jwtSecret}`);