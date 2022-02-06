const mongoose = require('mongoose');
const validator = require('validator');

const requestSchema = mongoose.Schema({

    bookId: {
        type: String,
        required: true,
        minlength : 10,
        maxlength : 100,
    },
    userId: {
        type: String,
        required: true,
        minlength : 10,
        maxlength : 100,
    },
})

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;