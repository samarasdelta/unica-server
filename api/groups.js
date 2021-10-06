const express = require("express");

const router = express.Router();

const pool = require("../models/db.js");

// Register routes

// read projects
router.get("/", (req, res) => {
  pool.query(`SELECT * FROM groups`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// export
module.exports = router;
