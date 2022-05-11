const express = require("express");

const router = express.Router();

const { pool } = require("../models/db.js");

// Register routes

// read users
router.get("/", (req, res) => {
  pool.query(`SELECT * FROM users ORDER BY userId DESC`, (error, results) => {
    if (error) throw error;

    const users = results;

    const updatedUsers = users.map((user) => {
      // eslint-disable-next-line no-param-reassign
      user.userFullName = `${user.userFirstName} ${user.userSurName}`;
      return user;
    });

    res.send(updatedUsers);
  });
});

// get user id
router.get("/:userId", (req, res) => {
  const id = req.params.userId;

  pool.query(`SELECT * FROM users WHERE userId=${id}`, (err, results) => {
    if (err) res.status(500).send({ error: err.message });

    const users = results;

    const updatedUsers = users.map((user) => {
      // console.log("user: ", user);
      // eslint-disable-next-line no-param-reassign
      user.userFullName = `${user.userFirstName} ${user.userSurName}`;
      return user;
    });

    res.send(updatedUsers);

    // return res.status(200).send(results[0]);
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

// put update
router.put("/:userId", (req, res) => {
  const id = req.params.userId;

  pool.query(
    `UPDATE users SET ? WHERE userId=${id}`,
    getQuery(req.body),
    (err) => {
      if (err) res.status(500).send({ error: err.message });
      return res.status(200).send({
        message: `User with id: ${id}, updated!`,
      });
    }
  );
});

// export
module.exports = router;
