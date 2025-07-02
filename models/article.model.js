const db = require("./db");
const pool = db.pool;
const moment = require("moment");

const Article = {
  // 分页查询文章列表
  async searchArticle(query, user) {
    let pagenum = query.pagenum || 1;
    let pagesize = query.pagesize || 10;
    let whereArr = [` article.username = '${user.username}' `];

    if (Number(query.id)) {
      whereArr.push(` ac.categoryId = ${query.id} `);
    }
    if (query.name) {
      whereArr.push(` category.name = '${query.name}' `);
    }
    if (query.title) {
      whereArr.push(` article.title like  '%${query.title}%' `);
    }
    let whereStr = whereArr.join(" && ");

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
            WHERE  ${whereStr} 
            ORDER BY createtime DESC `;

    const [rows] = await pool.query(
      `${selectStr} LIMIT ${(pagenum - 1) * pagesize} , ${pagenum * pagesize}`
    );
    const [conutrow] = await pool.query(`
            SELECT 
               COUNT(*) AS total
            FROM article
            JOIN article_category ac ON article.id = ac.articleId
            JOIN category  ON ac.categoryId = category.id 
            WHERE ${whereStr}`);
    return {
      rows,
      pageData: {
        total: Number(conutrow[0].total),
        pagenum: Number(pagenum),
        pagesize: Number(pagesize),
      },
    };
  },

  // 根据id查询当个文章
  async searchSingleArticle(id) {
    const [rows] = await pool.query(
      `
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
                WHERE article.id = ?`,
      [id]
    );
    return rows[0];
  },
  // 根据id将文章阅读量+1
  async addArticleReadCount(id) {
    const [rows] = await pool.query(
      `UPDATE article
        SET readCount = readCount + 1 
        WHERE id = ?`,
      [id]
    );
    return rows[0];
  },
  // 根据分类ID查询文章数量
  async searchArticleCountByCategory(id) {
    const [rows] = await pool.query(
      `
            SELECT COUNT(*) AS total FROM article_category WHERE categoryId = ? `,
      [id]
    );
    return rows[0];
  },
  // 新增文章
  async insertArticle(params, user) {
    const [rows] = await pool.query(
      `INSERT INTO article (title,  description , content, username ,createtime ) VALUES (?, ? , ?, ? , ?)`,
      [
        params.title,
        params.description,
        params.content,
        user.username,
        moment().format("YYYY-MM-DDTHH:mm:ss.000Z"),
      ]
    );
    return rows;
  },
  // 新增文章和类型的关系
  async insertArticleBindCategory(params) {
    const [rows] = await pool.query(
      `INSERT INTO article_category (articleId,  categoryId ) VALUES (?, ? )`,
      [params.articleId, params.categoryId]
    );
    return rows;
  },
  // 修改文章
  async updateArticle(params) {
    const [rows] = await pool.query(
      `UPDATE article
        SET title = ? , description = ? , content = ? 
        WHERE id = ?`,
      [params.title, params.description, params.content, params.id]
    );
    return rows;
  },
  // 修改文章和类型的关系
  async updateArticleBindCategory(params) {
    const [rows] = await pool.query(
      `UPDATE article_category
        SET  categoryId = ? 
        WHERE articleId = ?`,
      [params.categoryId, params.id]
    );
    return rows;
  },
  // 删除文章
  async deleteArticle(id) {
    const [rows] = await pool.query(`DELETE FROM article WHERE id = ?`, [id]);
    return rows;
  },
  // 删除文章和类型的关系
  async deleteArticleBindCategory(id) {
    const [rows] = await pool.query(
      `DELETE FROM article_category WHERE articleId = ?`,
      [id]
    );
    return rows;
  },
  // 新增当前用户的浏览记录
  async insertUserArticle(id, user) {
    const [rows] = await pool.query(
      `
            REPLACE INTO user_browsinghistory 
            (username, articleId , historytime ) 
            VALUES 
            ( ? , ? , ?)`,
      [user.username, id ,  moment().format("YYYY-MM-DDTHH:mm:ss.000Z")]
    );
    return rows;
  },
  // 查询当前用户的浏览记录
  async selectUserArticle(user) {
    const [rows] = await pool.query(
      ` SELECT 
                *
                FROM user_browsinghistory ubh  
                JOIN article  ON ubh.articleId = article.id 
                WHERE ubh.username = ? 
                ORDER BY ubh.historytime DESC
                LIMIT 10`,
      [user.username]
    );
    return rows;
  },
  // 查询当前用户的浏览记录条数
  async selectUserArticlNum(user) {
    const [conutrow] = await pool.query(
      `
            SELECT 
               COUNT(*) AS total
            FROM user_browsinghistory
            WHERE username = ?
            `,
      [user.username]
    );
    return Number(conutrow[0].total);
  },
  // 删除最旧的50条浏览记录
  async deleteUserArticleOld50() {
    const [rows] = await pool.query(
        `DELETE FROM user_browsinghistory
        ORDER BY id DESC
        LIMIT 50`
    );
    return { rows };
  },
};

module.exports = Article;
