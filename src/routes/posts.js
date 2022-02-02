const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {
    res.json({
        posts : {
            posts : "MY POST 1",
            description : "random data 1"
        }
    })
})



module.exports = router
