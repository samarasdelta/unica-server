// Health Checkpoint
const express = require("express");

const passport = require("passport");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("All goooood");
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("All good");
  }
);

module.exports = router;
