const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();


mongoose.connect('mongodb://127.0.0.1:27017/book-app', {
    useNewUrlParser: true,
    // useCreateIndex: true
});
