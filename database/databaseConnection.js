const dbConfig = require('./databaseConfig');
const mysql = require('mysql2/promise');


const pool = mysql.createPool(dbConfig);

module.exports = pool;