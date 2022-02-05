const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const storageRef = require('../firebase');
const {
    ref,
    uploadBytes,
    getDownloadURL
} = require("firebase/storage");
const Book = require('../models/book');


router.post('/books', upload.single('fileName'), async (req, res, next) => {

    const imagesRef = ref(storageRef, 'images');

    //getting array buffer and files original name;
    const buffer = req.file.buffer;
    const imageName = req.file.originalname;

    //creating space reference 
    const spaceRef = ref(imagesRef, imageName);

    //destructuring body to get book details
    const {
        bookAuthor,
        bookDescription,
        bookName,
        bookPrice,
        CreatedAt
    } = req.body;

    //Converting array buffer in to a Uint8Array 
    var uint8View = new Uint8Array(buffer);

    let downloadUrl;

    try {
        //uploading image to firebase
        await uploadBytes(spaceRef, uint8View).then((snapshot) => {
            console.log('Uploaded Image!');
        });

        //getting download Url
        downloadUrl = await getDownloadURL(ref(spaceRef));

    } catch (error) {
        console.log(error);
    }

    //Create And Validate a newbook
    const book = new Book({
        bookAuthor,
        bookDescription,
        bookName,
        bookPrice,
        CreatedAt,
        bookCover: downloadUrl
    })


    try {
        const savedBook = await book.save();

        //201 -> book posted
        res.status(201).send({
            bookId: savedBook._id,
            bookName: savedBook.bookName,
        });
    } catch (error) {
        res.status(400).send(error)
    }

    next();
});


router.get('/books', async (req, res, next) => {

    try {
        const books = await Book.find({});
        console.log(books);
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send(error);
    }
    next();
})

module.exports = router