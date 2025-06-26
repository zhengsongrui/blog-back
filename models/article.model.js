const db = require('./db');
const pool = db.pool;

const Article = {
    // 分页查询文章列表
    async searchArticle(query) {
        let whereStr = ""
        if (Number(query.id) && query.name) {
            whereStr = `WHERE ac.categoryId = ${query.id}  || category.name = '${query.name}' `
        }
        if (Number(query.id) && !query.name) {
            whereStr = `WHERE ac.categoryId = ${query.id}`
        }
        if (!Number(query.id) && query.name) {
            whereStr = `WHERE category.name = '${query.name}' `
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
            ${whereStr}`

        let pagenum = query.pagenum || 1
        let pagesize = query.pagesize || 10
        const [rows] = await pool.query(`${selectStr} LIMIT ${(pagenum - 1) * pagesize} , ${(pagenum) * pagesize}`,
        );
        const [conutrow] = await pool.query(`
            SELECT 
               COUNT(*) AS total
            FROM article
            JOIN article_category ac ON article.id = ac.articleId
            JOIN category  ON ac.categoryId = category.id 
            ${whereStr}`,
        );
        return {
            rows,
            pageData: {
                total: Number(conutrow[0].total),
                pagenum: Number(pagenum) ,
                pagesize: Number(pagesize),
            }
        };
    },

    async searchSingleArticle(id){
        const [rows] = await pool.query(`SELECT * FROM article WHERE id = ?`,[id]);
        return rows[0]
    }
};

module.exports = Article;