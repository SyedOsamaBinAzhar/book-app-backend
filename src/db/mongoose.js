const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

exports.connection = async() => {
    await mongoose.connect('mongodb+srv://osamaazhar:osamaazhar123@cluster0.v4lbr.mongodb.net/book-app-vd?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    // useCreateIndex: true
});
console.log("database connected");
}


