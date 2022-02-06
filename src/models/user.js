const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength : 6,
        maxlength : 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength : 6,
        maxlength : 50,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please Enter A Valid Email Address")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength : 7,
        maxlength : 1024,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("remove password")
            }
        }
    },
    date : {
        type : Date,
        default : Date.now,
    },
    address : {
        type : String
    },
    contact : {
        type : Number
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;