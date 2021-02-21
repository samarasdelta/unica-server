const express = require("express");

const router = express.Router();

const pool = require("../models/db.js");

// Register routes
router.get("/", (req, res) => {
  pool.query("SELECT * FROM projects ", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
