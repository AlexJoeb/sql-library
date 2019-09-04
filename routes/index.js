// Import Express
const express = require("express");

// Express Router
const router = express.Router();

// Redirect users from the '/' path to '/books'.
router.get("/", (request, response) => {
    response.redirect("/books");
});

// Export Router
module.exports = router;