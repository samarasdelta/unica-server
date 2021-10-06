const express = require("express");

const status = require("./status");
const projects = require("./projects");
const groups = require("./groups");

const router = express.Router();

// Status check
router.use("/status", status);

// Projects endpoint
router.use("/projects", projects);

// Groups endpoint
router.use("/groups", groups);

module.exports = router;
