const mongoose = require('mongoose')
const validator = require('validator');

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        minlength : 10,
        maxlength : 250,
    },
    bookAuthor: {
        type: String,
        required: true,
        minlength : 10,
        maxlength : 250,
    },
    bookDescription: {
        type: String,
        required: true,
        minlength : 10,
        maxlength : 800,
    },
    bookPrice: {
        type: Number,
        required: true,
    },
    bookCover : {
        type: String,
        required: true,
        minlength : 10,
        maxlength : 800,
    }
})


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;