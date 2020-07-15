const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        error : null,
        data : "My dashboard",
        content : "dashboard content",
        user : req.user
    })
})

module.exports = router