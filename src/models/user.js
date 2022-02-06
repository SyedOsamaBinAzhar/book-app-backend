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

// userSchema.pre('save', async function (next) {
//     const user = this;

//     // console.log("just before saving")

//     if (user.isModified('password')){
//         user.password = await bcrypt.hash(user.password, 8);
//     }

//     //to make sure that saving is done.
//     next();
// })

const User = mongoose.model('User', userSchema);

module.exports = User;