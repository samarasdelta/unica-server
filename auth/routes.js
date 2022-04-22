const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../services/users");

/**
 * Users Login
 */
router.post("/login", async (req, res, next) => {
  const { email, pass } = req.body;
  console.log(`Login attempt ${email}`);
  try {
    const [user] = await db.getUserByEmail(email);
    //     let payload = { "id" : "1"};
    // let token = jwt.sign( payload,'secret',  { noTimestamp:true, expiresIn: '1h' });
    if (
      !user ||
      !user.userEmail ||
      !user.userPassword ||
      !user.userId ||
      pass !== user.userPassword
    ) {
      return res.sendStatus(403);
    }

    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    const token = jwt.sign({ userId: user.userId }, secret, {
      noTimestamp: true,
      expiresIn: "1h",
    });
    delete user.pass;
    delete user.salt;
    return res.send({ token, user });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/**
 * Users Registration
 */
router.post("/register", async (req, res, next) => {
  const { email, pass } = req.body;

  const user = {
    email,
    pass,
  };

  db.createUser(user)
    .then(() => {
      res.send({
        success: true,
        message: "Account created",
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
