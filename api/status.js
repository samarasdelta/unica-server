// Health Checkpoint
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("All goooood");
});

module.exports = router;
