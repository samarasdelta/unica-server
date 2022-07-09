const path = require("path");
const express = require("express");
const cors = require("cors");
const status = require("./status");
const projects = require("./projects");
const groups = require("./groups");
const users = require("./users");
const latexCompiler = require("./latexCompiler");
// const mysql = require("serverless-mysql")();

const app = express();
app.use(cors());

const router = express.Router();

// Status check
router.use("/status", status);

// Projects endpoint
router.use("/projects", projects);

// Groups endpoint
router.use("/groups", groups);

// LaTeX endpoint
router.use("/latex", latexCompiler);

// users endpoint
router.use("/users", users);

router.use("/tex", express.static(path.join(__dirname, "../tex")));

module.exports = router;
