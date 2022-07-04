'use-strict'

const mysql = require('mysql');


const MySQLProvider = () =>{
    let pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    const query = async (sql) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, client, done) {
                if (err) reject(err)
                client.query(sql, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            });
        })
    }

    return {
        query
    }
}


module.exports = MySQLProvider();