const express = require('express');
const router = express.Router();
const User = require('../models/user');


//UPDATE USER WHEN HE/SHE REQUESTS FOR A BOOK -> Add address And Contact Details.
router.patch('/users/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(e);
    }

})


module.exports = router;