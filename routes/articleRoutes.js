const router = require('express').Router();
const authMiddleware = require("../middleware/authMiddleware")
const Article = require("../models/article.model")

// 分页获取文章列表
router.get('/getArticleByPage',authMiddleware, (req, res) => {
    Article.searchArticle(req.query,req.user).then(result => {
        res.json({
            code: 200,
            data: result,
            message: 'success',
        })
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ message: '服务器错误' })
    })
});

// 通过ID获取文章详情
router.get('/getArticleById',authMiddleware, (req, res) => {
    Article.searchSingleArticle(req.query.id).then(result => {
        res.json({
            code: 200,
            data: result,
            message: 'success',
        })
        Article.addArticleReadCount(req.query.id)
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ message: '服务器错误' })
    })
});

module.exports = router;