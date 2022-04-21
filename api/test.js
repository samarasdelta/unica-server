const express = require("express");

const router = express.Router();
const usersDb = require("../services/users");

/**
 * The route here will be: /users/ (remember the prefix users is defined in api/index.js)
 */
router.get("/", (req, res) => {
  usersDb
    .getAllUsers()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

router.get("/create", (req, res) => {
  usersDb
    .createUser({
      email: "emailtest",
      pass: "passtest",
      fname: "mpampis",
      sname: "tsakalos",
      dob: "1111-11-11",
      telephone: "1111111111",
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

router.get("/email", (req, res) => {
  usersDb
    .getUserByEmail("insomnia@test.com")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

router.get("/id", (req, res) => {
  usersDb
    .getUserById("50")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

module.exports = router;
