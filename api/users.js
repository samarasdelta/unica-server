const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const passport = require("passport");

const { pool } = require("../models/db.js");

// Register routes

// read users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.decode(token);

    pool.query(
      `SELECT * FROM users ORDER BY userId='${decoded.userId}' DESC`,
      (error, results) => {
        if (error) throw error;

        const users = results;

        const updatedUsers = users.map((user) => {
          // eslint-disable-next-line no-param-reassign
          user.userFullName = `${user.userFirstName} ${user.userSurName}`;
          return user;
        });

        res.send(updatedUsers);
      }
    );
  }
);

// get user
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.decode(token);

    pool.query(
      `SELECT * FROM users WHERE userId='${decoded.userId}' `,
      (error, results) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  }
);

// get user id
router.get("/:userId", (req, res) => {
  const id = req.params.userId;

  pool.query(`SELECT * FROM users WHERE userId=${id}`, (err, results) => {
    if (err) res.status(500).send({ error: err.message });

    const users = results;

    const updatedUsers = users.map((user) => {
      // eslint-disable-next-line no-param-reassign
      user.userFullName = `${user.userFirstName} ${user.userSurName}`;
      return user;
    });

    res.send(updatedUsers);
  });
});

const getQuery = (reqBody) => {
  const query = {};

  if (reqBody.email) {
    query.userEmail = reqBody.email;
  }

  if (reqBody.fname) {
    query.userFirstName = reqBody.fname;
  }

  if (reqBody.sname) {
    query.userSurName = reqBody.sname;
  }

  if (reqBody.pass) {
    query.userPassword = reqBody.pass;
  }

  return query;
};

// must be protected
// old put update
// router.put("/:userId", (req, res) => {
//   const id = req.params.userId;

//   pool.query(
//     `UPDATE users SET ? WHERE userId=${id}`,
//     getQuery(req.body),
//     (err) => {
//       if (err) res.status(500).send({ error: err.message });
//       return res.status(200).send({
//         message: `User with id: ${id}, updated!`,
//       });
//     }
//   );
// });

// put update
router.put(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.decode(token);

    pool.query(
      `UPDATE users SET ? WHERE userId=${decoded.userId}`,
      getQuery(req.body),
      (err) => {
        if (err) res.status(500).send({ error: err.message });
        return res.status(200).send({
          message: `User with id: ${decoded.userId}, updated!`,
        });
      }
    );
  }
);

// export
module.exports = router;
