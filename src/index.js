const express = require('express');
const authRoute = require('../src/routes/auth');
const postRoute = require('../src/routes/posts');


require('./db/mongoose');

const app = express();

const port = process.env.PORT || 8000;

//consuming json present in request
app.use(express.json())

//consuming routes
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);


app.listen(port, () => {
    console.log("Server is up on port " + port);
})