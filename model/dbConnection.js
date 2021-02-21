const mysql2 =  require("mysql2")

const pool = mysql2.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'thecraft98',
    database: 'matcha'
})

module.exports = pool;