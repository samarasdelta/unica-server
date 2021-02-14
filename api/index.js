const express = require("express");

const router = express.Router();

// Status check
const status = require("./status");

router.use("/status", status);

// Projects endpoint
const projects = require("./projects");

router.use("/projects", projects);

module.exports = router;
