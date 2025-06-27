const db = require('./db');
const pool = db.pool;

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
        const [rows] = await pool.query(`SELECT * FROM article WHERE id = ?`, [id]);
        return rows[0]
    },
    // 根据id将文章阅读量+1
    async addArticleReadCount(id) {
        const [rows] = await pool.query(`UPDATE article
       SET readCount = readCount + 1 
       WHERE id IN (?)`, [id]);
        return rows[0]
    },
    // 根据分类ID查询文章数量
    async searchArticleCountByCategory(id) {
        const [rows] = await pool.query(`
            SELECT COUNT(*) AS total FROM article_category WHERE categoryId = ? `, [id]);
        return rows[0]
    },
     
};

module.exports = Article;