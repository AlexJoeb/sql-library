// Import Express
const express = require("express");

// Express Router
const router = express.Router();

// Import DB Folder
const db = require("../db");

// Import Book Model
const { Book } = db.models;

// Init Book Var
let books;

// Render all books to the template.
router.get("/books", (request, response) => {
    // Async Function Due To Promise
    (async () => {
        try {
            // Finding all books with SQLize.
            books = await Book.findAll();
            response.render('index', { books });
        } catch (err){
            console.error('Error connecting to database => ', err);
        }
    })();
});

module.exports = router;