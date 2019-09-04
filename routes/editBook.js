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
                response.render('editbook', { book });
            } catch (err) {
                console.error("Could not retrieve book data => ", err);
            }
        })
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
                if(error.name === 'SequelizeValidationError'){
                    const erros = err.erros;
                    const book = {
                        id: req.body.id,
                        title: req.body.title,
                        author: req.body.author,
                        genre: req.body.genre,
                        year: req.body.year
                    }

                    response.render('editbook', { book, errors });
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
                const deleteBook = await Book.findByPk(request.params.id);
                await deleteBook.destory();
                response.redirect("/books");
            }catch(err){
                console.error("Could not delete book => ", err);
            }
        })();
    });

module.exports = router;