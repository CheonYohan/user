const dbConfig = require('./databaseConfig');
const mysql = require('mysql');


const pool = mysql.createPool(dbConfig);
module.exports = pool;