const db = require('./db');
const pool = db.pool;

const Category = {
    // 查询分类
    async searchAllCategory(user) {
        const [rows] = await pool.query(`SELECT * FROM category  WHERE username = '${user.username}' ORDER BY sort`);
        return rows;
    },
    // 新增分类
    async insertCategory(params, user) {
        const [rows] = await pool.query(`INSERT INTO category (name,  username) VALUES (?, ? )`, [params.name, user.username]);
        return rows;
    },
    // 删除分类
    async deleteCategory(id) {
        const [rows] = await pool.query(`DELETE FROM category WHERE id = ?`, [id]);
        return rows;
    },
     // 更新分类数据
    async deleteCategory(id) {
        const [rows] = await pool.query(`DELETE FROM category WHERE id = ?`, [id]);
        return rows;
    },
     // 更新分类数据
    async updateCategory(params) {
        const [rows] = await pool.query(`UPDATE category SET NAME = ? , SORT = ? WHERE id = ?`, [params.name,params.sort,params.id]);
        return rows;
    },
};

module.exports = Category;