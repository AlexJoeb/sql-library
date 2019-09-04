// Import Express //
const express = require("express");

// Dev Port // 
const port = process.env.PORT || 3000;

// Express Application //
    const app = express();
    // Declare PUG as view engine
    app.set('view engine', 'pug');
    // Connect with static assests (:public)
    app.use('/static', express.static('public'));

// Routing //
    // Main Route String
    const mr = "./routes/";    
    // Index
    const index = require(mr + "index");
    // Books
    const books = require(mr + "books");
    // AddBook
    const addbook = require(mr + "addBook");
    // EditBook
    const editbook = require(mr + "editBook");

    app.use(index);
    app.use(books);
    app.use(addbook);
    app.use(editbook);

// Error Handler
app.use((request, response, next) => {
    const err = new Error("Opps! This URL couldn't be found.");
    err.status = 404;
    response.status(err.status);
    response.render('404');
});

app.use((error, request, response, next) => {
    const err = new Error("Opps! This URL couldn't be found.");
    err.status = 404;
    response.status(err.status);
    response.render('404');
});

// Setting Express's Port
app.listen(port, () => {
    console.log(`Express application running on PORT ${port}! :)`);
});