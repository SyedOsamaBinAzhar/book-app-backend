const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    //If user is already present in DB
    const userExist = await User.findOne({ email : req.body.email});
    if(userExist) return res.status(400).send("This email already exists.")        


    //HASH AND SALT PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create And Validate a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    //SAVE USER
    try {
        const savedUser = await user.save();
        //201 -> user posted
        res.status(201).send({user : user._id})
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router