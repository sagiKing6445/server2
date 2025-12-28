const mysql = require('mysql2');

class MySQLDB {
    constructor() {
        this.pool = mysql.createPool({
            host: "localhost",
            database: "example",
            user: "admin",
            password: "admin",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    query(sql, args, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
                    console.error('Fatal error. Cannot process more requests.');
                }
                return callback(err);
            }

            connection.query(sql, args, (error, results) => {
                connection.release();
                if (error) return callback(error);
                callback(null, results);
            });
        });
    }
}

const DB = new MySQLDB();
module.exports = DB;
