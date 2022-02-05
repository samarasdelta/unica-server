const express = require("express");

const router = express.Router();

const pool = require("../models/db.js");

// Register routes

// read users
router.get("/", (req, res) => {
  pool.query(`SELECT * FROM users ORDER BY userId DESC`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// get user id
router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  pool.query(`SELECT * FROM users WHERE userId=${id}`, (err, results) => {
    if (err) res.status(500).send({ error: err.message });

    return res.status(200).send(results[0]);
  });
});

// create user
router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO users(userFirstName, userSurName, userEmail, userPassword, userDateOfBirth, userTelephone ) VALUES ('${req.body.fname}', '${req.body.sname}' ,'${req.body.email}', '${req.body.pass}' ,'${req.body.dob}','${req.body.telephone}' ) `,
    (error, results) => {
      if (error) {
        res.status(500).json({
          error: error.message,
        });
        throw error;
      }
      pool.query(
        `SELECT * FROM users WHERE userId=${results.insertId}`,
        (error1, results1) => {
          if (error1) {
            res.status(500).json({
              error1: error1.message,
            });
            throw error1;
          }
          res.send(results1);
        }
      );
      // pool.query(
      //   `SELECT CONCAT('${req.body.fname}', ' ' ,'${req.body.sname}') AS userDisplayName from users`,
      //   (error2, results2) => {
      //     if (error2) {
      //       res.status(500).json({
      //         error2: error2.message,
      //       });
      //       throw error2;
      //     }
      //     res.send(results2);
      //   }
      // );
    }
  );
});

// get user id
router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  pool.query(`SELECT * FROM users WHERE userId=${id}`, (err, results) => {
    if (err) res.status(500).send({ error: err.message });

    return res.status(200).send(results[0]);
  });
});

// export
module.exports = router;

// pool.query(
//   `SELECT CONCAT_WS(' ', '${req.body.fname}', '${req.body.fname}') AS userDisplayName from users`,
//   (error2) => {
//     if (error2) {
//       res.status(500).json({
//         error2: error2.message,
//       });
//       throw error2;
//     }
//   }
// );
