const db = require('./db');
const pool = db.pool;

const Category = {
    // 查询分类
    async searchAllCategory() {
        const [rows] = await pool.query('SELECT * FROM category');
        return rows;
    },

};

module.exports = Category;