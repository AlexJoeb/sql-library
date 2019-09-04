// Import Sqlize
const Sequelize = require("sequelize");

// Set up sqlize
const sqlize = new Sequelize({
    dialect: 'sqlite',
    storage: 'library.db'
});

const db = {
    sqlize,
    Sequelize,
    models: {},
}

// Model
db.models.Book = require("./models/book.js")(sqlize);

// Export
module.exports = db;