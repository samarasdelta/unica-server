const express = require("express");

const status = require("./status");
const projects = require("./projects");

const router = express.Router();

// Status check
router.use("/status", status);

// Projects endpoint
router.use("/projects", projects);

module.exports = router;
