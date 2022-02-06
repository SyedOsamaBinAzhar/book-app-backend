const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 50,
    },
    userId: {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 100,
    },
    bookId : {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 100,
    },
    date : {
        type : Date,
        default : Date.now,
    },
    commentContent : {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 100,
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;