'use-strict'

const mysql = require('mysql');
const PostgresProvider = require('./providers/postgres_provider');

const BookRepo = () => {
    const findAllBooks = async () => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");

            // con PostgresProvider providers
            let books = await PostgresProvider.query("SELECT * FROM book");
            return books.rows;
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    const findBook = async ({id}) => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");

            // con PostgresProvider providers
            console.log(id)
            let book = await PostgresProvider.query('SELECT * FROM book WHERE id = $1', [id]);
            return book.rows[0];

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    const createBook = async ({ name, author, editorial, year}) => {
        try {
            // con MySQL providers
            // let sql = mysql.format("INSERT INTO books(name, email, password) VALUES (?, ?, ?)", [name, email, password]);

            // con MySQL providers
            // return result.affectedRows > 0 ? {
            //     id: result.insertId, name, email, password
            // } : null;

            // con PostgresProvider providers
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
    return {
        findAll: findAllBooks,
        create: createBook,
        find: findBook,
    }
}

module.exports = BookRepo();