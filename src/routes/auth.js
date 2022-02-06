const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {


    //If user is already present in DB
    const userExist = await User.findOne({
        email: req.body.email
    });
    if (userExist) return res.status(400).send("This email already exists.")


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
        res.status(201).send({
            userId: savedUser._id,
            usersName: savedUser.name,
            usersEmail: savedUser.email
        })
    } catch (error) {
        res.status(400).send(error)
    }

})


router.post('/login', async (req, res) => {
    
    //If user is present in DB
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send("Email not found!")

    //Checking password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Incorrect Password!")


    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({
        token,
        userId: user._id,
        userName: user.name,
        userEmail: user.email
    })
})

module.exports = router