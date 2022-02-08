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

//write a book
router.post('/books', upload.single('fileName'), async (req, res, next) => {

    const imagesRef = ref(storageRef, 'images');

    //getting array buffer and files original name;
    const buffer = req.file.buffer;
    console.log("buffer", buffer);
    const imageName = req.file.originalname;
    // console.log("imageName", imageName);

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
            console.log('Could not save image please try again');
        });

        //getting download Url
        downloadUrl = await getDownloadURL(ref(spaceRef));

    } catch (error) {
        res.send("Could not save image please try again");
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
        res.status(400).send("Could not save book please try again!")
    }

    next();
});

//read a book by id
router.get('/books/:id', async (req, res) => {

    const bookId = req.params.id;

    //getting book by ID
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send()
        }
        res.status(200).send(book)
    } catch (error) {
        res.status(500).send()
    }
})

//read all books
router.get('/books', async (req, res, next) => {
    try {
        const books = await Book.find({});

        res.status(200).send(books)
    } catch (error) {
        res.status(400).send(error);
    }
    next();
})



module.exports = router