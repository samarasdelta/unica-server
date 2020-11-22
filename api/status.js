const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
	res.send("All good");
});

module.exports = router;
