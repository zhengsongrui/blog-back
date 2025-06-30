const db = require('./db');
const pool = db.pool;
const moment = require('moment')

const Article = {
    // 分页查询文章列表
    async searchArticle(query,user) {
         let pagenum = query.pagenum || 1
        let pagesize = query.pagesize || 10

        let whereStr = ""
        if (Number(query.id) && query.name) {
            whereStr = ` && ( ac.categoryId = ${query.id}  || category.name = '${query.name}' )`
        }
        if (Number(query.id) && !query.name) {
            whereStr = ` && ac.categoryId = ${query.id}`
        }
        if (!Number(query.id) && query.name) {
            whereStr = ` && category.name = '${query.name}' `
        }
        
        let selectStr = `
            SELECT 
                article.id,
                article.title,
                article.description,
                article.createtime ,
                article.readCount,
                category.name AS categoryName
            FROM article
            JOIN article_category ac ON article.id = ac.articleId
            JOIN category  ON ac.categoryId = category.id 
            WHERE article.username = '${user.username}'  ${whereStr}
            ORDER BY createtime DESC ` 

        const [rows] = await pool.query(`${selectStr} LIMIT ${(pagenum - 1) * pagesize} , ${(pagenum) * pagesize}`,
        );
        const [conutrow] = await pool.query(`
            SELECT 
               COUNT(*) AS total
            FROM article
            JOIN article_category ac ON article.id = ac.articleId
            JOIN category  ON ac.categoryId = category.id 
            WHERE article.username = '${user.username}'
            ${whereStr}`,
        );
        return {
            rows,
            pageData: {
                total: Number(conutrow[0].total),
                pagenum: Number(pagenum),
                pagesize: Number(pagesize),
            }
        };
    },

    // 根据id查询当个文章
    async searchSingleArticle(id) {
        const [rows] = await pool.query(`
            SELECT 
                article.id,
                article.title,
                article.description,
                article.createtime ,
                article.readCount,
                article.content,
                ac.categoryId 
                FROM article 
                JOIN article_category ac  ON article.id = ac.articleId 
                WHERE article.id = ?`, [id]);
        return rows[0]
    },
    // 根据id将文章阅读量+1
    async addArticleReadCount(id) {
        const [rows] = await pool.query(`UPDATE article
        SET readCount = readCount + 1 
        WHERE id = ?`, [id]);
        return rows[0]
    },
    // 根据分类ID查询文章数量
    async searchArticleCountByCategory(id) {
        const [rows] = await pool.query(`
            SELECT COUNT(*) AS total FROM article_category WHERE categoryId = ? `, [id]);
        return rows[0]
    },
    // 新增文章
    async insertArticle(params, user) {
        const [rows] = await pool.query(`INSERT INTO article (title,  description , content, username ,createtime ) VALUES (?, ? , ?, ? , ?)`, [params.title, params.description, params.content, user.username,moment().format('YYYY-MM-DDTHH:mm:ss.000Z')]);
        return rows;
    },
    // 新增文章和类型的关系
    async insertArticleBindCategory(params) {
        const [rows] = await pool.query(`INSERT INTO article_category (articleId,  categoryId ) VALUES (?, ? )`, [params.articleId, params.categoryId]);
        return rows;
    },
    // 修改文章
    async updateArticle(params) {
        const [rows] = await pool.query(`UPDATE article
        SET title = ? , description = ? , content = ? 
        WHERE id = ?`, [params.title,params.description,params.content,params.id]);
        return rows;
    },
    // 修改文章和类型的关系
    async updateArticleBindCategory(params) {
        const [rows] = await pool.query(`UPDATE article_category
        SET  categoryId = ? 
        WHERE articleId = ?`, [params.categoryId,params.id]);
        return rows;
    },
    // 删除文章
    async deleteArticle(id) {
        const [rows] = await pool.query(`DELETE FROM article WHERE id = ?`, [id]);
        return rows;
    },
    // 删除文章和类型的关系
    async deleteArticleBindCategory(id) {
        const [rows] = await pool.query(`DELETE FROM article_category WHERE articleId = ?`, [id]);
        return rows;
    },
};

module.exports = Article;