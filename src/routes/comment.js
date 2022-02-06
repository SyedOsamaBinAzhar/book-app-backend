const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.post('/comments', async (req, res) => {

    //Create And Validate a new comment
    const comment = new Comment({
        userName: req.body.userName,
        bookId: req.body.bookId,
        userId: req.body.userId,
        commentContent: req.body.commentContent,
    })

    console.log(comment);

    //SAVE Comment in DB with userId and bookId to form a relation.
    try {
        const savedComment = await comment.save();
        //201 -> user posted
        res.status(201).send({
            userId: savedComment.userId,
            bookId: savedComment.bookId,
            userName: savedComment.userName,
            commentContent: savedComment.commentContent,
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;