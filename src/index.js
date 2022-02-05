const express = require('express');
var cors = require('cors');
const authRoute = require('../src/routes/auth');
const bookRoute = require('../src/routes/books');

// const postRoute = require('../src/routes/posts');
const busboy = require('connect-busboy');
const bodyParser = require('body-parser');


// Default options, no immediate parsing
require('./db/mongoose');

const app = express();

const port = process.env.PORT || 8000;

//consuming json present in request
 

// app.use(busboy());

// app.use(bodyParser.json());

// app.use(upload.single("fileName"));


app.use(cors());
app.use('/api/user',authRoute);
app.use('/api/user',bookRoute);

// app.use('/api/posts',postRoute);



app.listen(port, () => {
    console.log("Server is up on port " + port);
})