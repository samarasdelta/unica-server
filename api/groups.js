const express = require("express");

const router = express.Router();

const passport = require("passport");

const jwt = require("jsonwebtoken");

const { pool } = require("../models/db.js");

// Register routes

// read groups
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.decode(token);

    pool.query(
      `SELECT * FROM groups WHERE groupOwnerId='${decoded.userId}' ORDER BY groupId DESC`,
      (error, results) => {
        if (error) throw error;
        res.send(results);
      }
    );
  }
);

// create group
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.decode(token);

    pool.query(
      `INSERT INTO groups(groupTitle, groupOwnerId) VALUES (?, ?) `,
      [req.body.title, decoded.userId],
      (error, results) => {
        if (error) {
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
  }
);

// get group id
router.get("/:groupId", (req, res) => {
  const id = req.params.groupId;
  pool.query(`SELECT * FROM groups WHERE groupId=${id}`, (err, results) => {
    if (err) res.status(500).send({ error: err.message });

    return res.status(200).send(results[0]);
  });
});

// export
module.exports = router;
