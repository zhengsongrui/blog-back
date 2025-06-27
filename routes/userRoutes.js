const router = require('express').Router();
const User = require('../models/user.model');
const JwtUtils = require('../utils/jwtUtils');


// 登录
router.post('/login', (req, res) => {
    User.findByLogin(req.body).then(result => {
        if (result) {
            // 4. 生成 JWT token
            const tokenPayload = {
                id: result.id,
                username: result.username,
                nickname: result.nickname
            };
            const token = JwtUtils.generateToken(tokenPayload);
            // 5. 返回响应（排除密码）
            res.json(
                {
                    code: 200,
                    data: {
                        user: tokenPayload,
                        token,
                        expiresIn: '7d' // 与 generateToken 中的设置一致
                    },
                    message: '登录成功！',
                })
        } else {
            res.json({
                code: 201,
                data: result,
                message: '用户名或密码错误！',
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({message:'服务器错误'})
    })
});

// 根据token查询用户
// router.get('/findUser', (req, res) => {
//     User.findById().then(result => {
       
//     }).catch(err => {
//         console.log(err)
//     })
// });

module.exports = router;