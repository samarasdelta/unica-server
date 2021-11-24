const express = require("express");

const status = require("./status");
const projects = require("./projects");
const groups = require("./groups");
const users = require("./users");

const router = express.Router();

// Status check
router.use("/status", status);

// Projects endpoint
router.use("/projects", projects);

// Groups endpoint
router.use("/groups", groups);

// Groups endpoint
router.use("/users", users);

module.exports = router;
