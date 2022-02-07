const express = require('express');
var cors = require('cors');
const authRoute = require('../src/routes/auth');
const bookRoute = require('../src/routes/books');
const userRoute = require('../src/routes/user');
const commentRoute = require('../src/routes/comment');
const bookIssueRoute = require('../src/routes/bookIssueRequest');


// Default options, no immediate parsing
require('./db/mongoose');

const app = express();

const port = process.env.PORT || 8000;

//consuming json present in request
app.use(express.json());

app.use(cors());
app.use('/api/user', authRoute);
app.use('/api/user', bookRoute);
app.use('/api/user', userRoute);
app.use('/api/user', commentRoute);
app.use('/api/user', bookIssueRoute);

app.listen(port, () => {
    console.log("Server is up on port " + port);
})