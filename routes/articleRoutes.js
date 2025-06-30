const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const strictAuthMiddleware = require("../middleware/strictAuthMiddleware");
const Article = require("../models/article.model");

// 分页获取文章列表
router.get("/getArticleByPage", authMiddleware, (req, res) => {
  Article.searchArticle(req.query, req.user)
    .then((result) => {
      res.json({
        code: 200,
        data: result,
        message: "success",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "服务器错误" });
    });
});

// 通过ID获取文章详情
router.get("/getArticleById", authMiddleware, (req, res) => {
  Article.searchSingleArticle(req.query.id)
    .then((result) => {
      res.json({
        code: 200,
        data: result,
        message: "success",
      });
      Article.addArticleReadCount(req.query.id);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "服务器错误" });
    });
});

// 新增文章
router.post("/addArticle", strictAuthMiddleware, (req, res) => {
  Article.insertArticle(req.body, req.user)
    .then((articleResult) => {
      let params = {
        articleId: articleResult.insertId,
        categoryId: req.body.categoryId,
      };
      Article.insertArticleBindCategory(params)
        .then((result) => {
          // result
          res.json({
            code: 200,
            data: result,
            message: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "服务器错误" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "服务器错误" });
    });
});

// 删除文章
router.delete("/deleteArticle/:id", strictAuthMiddleware, (req, res) => {
  Article.deleteArticle(req.params.id)
    .then(() => {
      Article.deleteArticleBindCategory(req.params.id)
        .then(() => {
          res.json({
            code: 200,
            data: null,
            message: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "服务器错误" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "服务器错误" });
    });
});

// 修改文章
router.put("/updateArticle", strictAuthMiddleware, (req, res) => {
  Article.updateArticle(req.body)
    .then(() => {
      Article.updateArticleBindCategory(req.body)
        .then(() => {
          res.json({
            code: 200,
            data: null,
            message: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "服务器错误" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "服务器错误" });
    });
});

module.exports = router;
