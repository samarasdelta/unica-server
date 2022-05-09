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
      // console.log("user: ", user);
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

// // create user
// router.post("/", (req, res) => {
//   pool.query(
//     `INSERT INTO users(userFirstName, userSurName, userEmail, userPassword, userDateOfBirth, userTelephone ) VALUES ('${req.body.fname}', '${req.body.sname}' , '${req.body.email}', '${req.body.pass}' ,'${req.body.dob}','${req.body.telephone}' ) `,
//     (error, results) => {
//       if (error) {
//         res.status(500).json({
//           error: error.message,
//         });
//         throw error;
//       }
//       pool.query(
//         `SELECT * FROM users WHERE userId=${results.insertId}`,
//         (error1, results1) => {
//           if (error1) {
//             res.status(500).json({
//               error1: error1.message,
//             });
//             throw error1;
//           }
//           // const createdUser = results1[0];

//           // createdUser.userFullName = `${createdUser.userFirstName} ${createdUser.userSurName}`;

//           res.send(results1);
//         }
//       );
//     }
//   );
// });

// get user id
router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  pool.query(`SELECT * FROM users WHERE userId=${id}`, (error, results) => {
    if (error) {
      res.status(500).json({
        error: error.message,
      });
      throw error;
    }

    res.send(results[0]);
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
