const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const pool = mysql.createPool({
  host: dbConfig.HOST,
  // socketPath: dbConfig.SOCKET,
  user: dbConfig.USER,
  password: dbConfig.PASS,
  database: dbConfig.DB,
  connectionLimit: dbConfig.CONLIMIT,
});

const db = async (sqlQueryString) => {
  return new Promise((resolve, reject) => {
    pool.query(sqlQueryString, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = {
  db,
  pool,
};
