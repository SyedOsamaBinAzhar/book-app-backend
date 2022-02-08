const express = require('express');
const router = express.Router();
const Request = require('../models/bookIssueRequest');

router.post('/request', async (req, res) => {
    const request = new Request(req.body);

    try {
        await request.save()
        res.status(201).send(request)
    } catch (error) {
        res.status(400).send("Something Went Wrong Please Try Again.")
    }
});

module.exports = router;