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

// create group
router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO groups(groupTitle) VALUES ('${req.body.title}') `,
    (error, results) => {
      // console.log(results.insertId);
      if (error) {
        // console.log('Error message: ', error.message);
        res.status(500).json({
          error: error.message,
        });
        throw error;
      }
      pool.query(
        `SELECT * FROM groups WHERE groupId=${results.insertId}`,
        (error1, results1) => {
          if (error1) throw error;
          res.send(results1);
        }
      );
    }
  );
});

// export
module.exports = router;
