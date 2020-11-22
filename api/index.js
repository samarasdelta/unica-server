const express = require("express");
const router = express.Router();

const status = require("./status");

router.use("/status", status);

module.exports = router;
