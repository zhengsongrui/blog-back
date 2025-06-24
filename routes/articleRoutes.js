const router = require('express').Router();

router.get('/getArticleByPage', (req, res) => {
    console.log('getArticleByPage')
    res.json({
        aa:''
    })
});

module.exports = router;