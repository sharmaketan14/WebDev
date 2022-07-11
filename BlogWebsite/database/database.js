const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    multipleStatements: false,
    database: "blog",
    user: "sharmaketan_prac",
    password: "password"
})

module.exports = pool;