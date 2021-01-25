const express = require("express");
const router = express.Router();

const projects = require("./data.json");
const status = require("./status");

router.use("/status", status);

router.get("/projects", (req, res) => {
    res.send(projects.papers);
});

module.exports = router;