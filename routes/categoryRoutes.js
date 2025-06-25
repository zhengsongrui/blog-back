const router = require('express').Router();

// 获取分类列表
router.get('/getCategoryList', (req, res) => {
    console.log('getCategoryList')
    res.json({
        code: 200,
        data: [
            {
            id:'1',
            name:'前端',
            code:1,
            level:1,
            child:null,
        },
        {
            id:'2',
            name:'后端',
            code:2,
            level:1,
            child:null,
        },
         {
            id:'3',
            name:'服务器',
            code:3,
            level:1,
            child:null,
        },
        {
            id:'4',
            name:'其他',
            code:4,
            level:1,
            child:null,
        },
  ],
        message: 'success',
    })
});

module.exports = router;