'use-strict'

const mysql = require('mysql');
const PostgresProvider = require('./providers/postgres_provider');

const BookRepo = () => {
    const findAllBooks = async () => {
        try {
            let books = await PostgresProvider.query("SELECT * FROM book");
            return books.rows;
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    const findBook = async (id) => {
        try {
            console.log(id)
            let sql = mysql.format("SELECT * FROM book WHERE id = ?",[id]);
            let book = await PostgresProvider.query(sql);
            console.log(book.rows)
            return book.rows[0];

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    const createBook = async ({ name, author, editorial, year}) => {
        try {
            let sql = mysql.format("INSERT INTO book(name, author, editorial, year) VALUES (?, ?, ?, ?) RETURNING id", [name, author, editorial, year]);
            const result = await PostgresProvider.query(sql);
            return result.rowCount > 0 ? {
                id: result.rows[0].id, name, author, editorial, year
            } : null;

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    const deleteBook = async (id) => {
        try {
            console.log(id)
            let sql = mysql.format("DELETE FROM book WHERE id = ?",[id]);
            let book = await PostgresProvider.query(sql);
            console.log(book.rows)
            return book.rows[0];

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    return {
        findAll: findAllBooks,
        create: createBook,
        find: findBook,
        delete: deleteBook,
    }
}

module.exports = BookRepo();