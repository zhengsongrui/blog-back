const router = require('express').Router();
const Category = require("../models/category.model")

// 获取分类列表
router.get('/getCategoryList', (req, res) => {
    Category.searchAllCategory().then(result => {
        res.json({
            code: 200,
            data: result,
            message: 'success',
        })
    }).catch(()=>{
        res.status(500).json({message:'服务器错误'})
    })

});

module.exports = router;