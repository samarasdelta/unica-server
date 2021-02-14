const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASS,
  database: dbConfig.DB,
  connectionLimit: dbConfig.CONLIMIT,
});

module.exports = pool;
