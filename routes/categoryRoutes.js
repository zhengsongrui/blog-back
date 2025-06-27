const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const strictAuthMiddleware = require("../middleware/strictAuthMiddleware");
const Category = require("../models/category.model");
const Article = require("../models/article.model");

// 获取分类列表
router.get("/getCategoryList", authMiddleware, (req, res) => {
  Category.searchAllCategory(req.user)
    .then((result) => {
      res.json({
        code: 200,
        data: result,
        message: "success",
      });
    })
    .catch(() => {
      res.status(500).json({ message: "服务器错误" });
    });
});

// 新增分类
router.post("/createCategory", strictAuthMiddleware, (req, res) => {
  Category.insertCategory(req.body, req.user)
    .then(() => {
      res.json({
        code: 200,
        data: null,
        message: "success",
      });
    })
    .catch(() => {
      res.status(500).json({ message: "服务器错误" });
    });
});

// 修改分类分类
router.put("/updateCategory", strictAuthMiddleware, (req, res) => {
  Category.updateCategory(req.body)
    .then(() => {
      res.json({
        code: 200,
        data: null,
        message: "success",
      });
    })
    .catch(() => {
      res.status(500).json({ message: "服务器错误" });
    });
});


// 删除分类
router.delete("/deleteCategory/:id", strictAuthMiddleware, (req, res) => {
  console.log(req.params);
  Article.searchArticleCountByCategory(req.params.id)
    .then((result) => {
      if (result.total>0) {
         res.json({
          code: 500,
          data: null,
          message: "该分类下有文章，禁止删除。",
        });
      } else {
        Category.deleteCategory(req.params.id).then(()=>{
            res.json({
                code: 200,
                data: null,
                message: 'success',
            })
        }).catch(()=>{
            res.status(500).json({message:'服务器错误'})
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "服务器错误" });
    });
});

module.exports = router;
