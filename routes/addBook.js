// Import Express
const express = require('express');

// Express Router
const router = express.Router();

// Database Connection
const db = require("../db");

// Books Import
const { Book } = db.models;

// Express Routing
    // Displaying the new book route. (get request)
    router.get("/books/new", (request, response) => {
        try {
            response.render("addbook");
        } catch (err) {
            error.status = 500;
            error.message = "Server error."
            next(err);
        }
    });

    // After new book forum is submitted. (post request)
    router.post("/books/new", (request, response) => {
        // Async for Promise
        (async () => {
            // Book Variables
            const id = request.params.id;
            const title = request.body.title;
            const author = request.body.author;
            const genre = request.body.genre;
            const year = request.body.year;

            try {

                const book = await Book.create({
                    id,
                    title,
                    author,
                    genre,
                    year
                });

                console.log(book);
                response.redirect(`/book/${book.dataValues.id}`);

            } catch (err) {
                // SQLize errors.
                if(err.name === "SequeelizeValidationError"){
                    const errors = err.errors;
                    response.render("addbook", { errors });
                } else {
                    // Other Errors
                    console.error(err);
                    err.status = 500;
                    err.message = "Could not add book to library. Error occured.";
                    next(err);
                }
            }
        })();
    });
    
    module.exports = router;