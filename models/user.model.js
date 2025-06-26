const db = require('./db');
const pool = db.pool;

const User = {
    // 根据ID查询用户
    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },


    // 根据用户名和密码查询用户
    async findByLogin(userData) {
        const { username, password } = userData;
        const [rows] = await pool.query(
            'SELECT * FROM user WHERE username = ? && password = ?',
            [username, password]
        );
        if (rows[0]) {
            return {
                id: rows[0].id,
                nickname: rows[0].nickname,
                username: rows[0].username
            }
        } else {
            return undefined;
        }
    }

};

module.exports = User;