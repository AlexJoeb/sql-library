// Import Express
const express = require("express");

// Express Router
const router = express.Router();

// Import DB Folder
const db = require("../db");

// Import Book Model
const { Book } = db.models;

// JSON Parsing
router.use(express.json());
router.use(express.urlencoded({extended: false}));

// Book:ID Routing
    // Getting Update Book Page (get request)
    router.get("/book/:id", (request, response) => {
        // Async for SQLize
        (async () => {
            try {        

                const book = await Book.findByPk(request.params.id);
                response.render('update-book', { book });
            } catch (err) {
                console.error("Could not retrieve book data => ", err);
            }
        })();
    });
    // After Updatet Book Form Submission (post request)
    router.post("/book/:id", (request, response) => {
        (async () => {
            try{
                // Find the book to update.
                const book = await Book.findByPk(request.params.id);
                // Update the book.
                await book.update(request.body)
                    .then(() => {
                        response.redirect("/books");
                    });
            }catch(err){
                // Catching SQLize Errors
                if(err.name === 'SequelizeValidationError'){
                    const errors = err.errors;
                    const book = {
                        id: request.params.id,
                        title: request.body.title,
                        author: request.body.author,
                        genre: request.body.genre,
                        year: request.body.year
                    }

                    console.log(book);

                    response.render('update-book', { book, errors });
                }else{
                    // Not SQLize, so respond with error template.
                    console.error(err);
                    err.status = 500;
                    err.message = "Could not add book to the datebase.";
                    next(err);
                }
            }
        })();
    });

    // Delete Book
    router.post('/book/:id/delete', (request, response) => {
        (async () => {
            try{
                Book.destroy({
                    where: {
                        id: request.params.id,
                    }
                });
                console.log("Deleted.");
                response.redirect("/books");
            }catch(err){
                console.error("Could not delete book => ", err);
            }
        })();
    });

module.exports = router;