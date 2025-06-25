const router = require('express').Router();

// 分页获取文章列表
router.get('/getArticleByPage', (req, res) => {
    console.log('getArticleByPage')
    res.json({
        code: 200,
        data: [{
            id:'12',
            title:'后端返回标题',
            description:'后端返回描述',
            date:'2020-09-08 15:30:30',
            category:'后端返回类别',
            readCount:0
        },
    {
            id:'122',
            title:'后端返回标题1',
            description:'后端返回描述1',
            date:'2020-09-08 15:30:32',
            category:'后端返回类别1',
            readCount:1
        },
    {
            id:'1222',
            title:'后端返回标题2',
            description:'后端返回描述2',
            date:'2020-09-08 15:30:33',
            category:'后端返回类别2',
            readCount:2
        },],
        message: 'success',
    })
});

module.exports = router;