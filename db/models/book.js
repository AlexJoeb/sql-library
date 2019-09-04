// Import SQLize
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}

    Book.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "No value found for title, please insert a value."
                },
                notEmpty: {
                    msg: "No value found for title, please insert a value."
                }
            }
        },

        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "No value found for title, please insert a value."
                },
                notEmpty: {
                    msg: "No value found for title, please insert a value."
                }
            }
        },

        genre: {
            type: Sequelize.STRING
        },

        year: {
            type: Sequelize.INTEGER
        }
    }, {sequelize});

    return Book;
}