const express = require("express");

const router = express.Router();

const pool = require("../models/db.js");

// Register routes

// read projects
router.get("/", (req, res) => {
  pool.query("SELECT * FROM projects ", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// create project
router.post("/", (req, res) => {
  // res.send(req.body.title);
  // console.log(req.body);
  pool.query(
    `INSERT INTO projects(projectTitle) VALUES ('${req.body.title}') `,
    (error, results) => {
      // console.log(results.insertId);
      if (error) throw error;
      pool.query(
        `SELECT * FROM projects WHERE projectId=${results.insertId}`,
        (error1, results1) => {
          if (error1) throw error;
          res.send(results1);
        }
      );
    }
  );
});

module.exports = router;
