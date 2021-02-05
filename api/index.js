const express = require("express");
const router = express.Router();

//Status check
const status = require("./status");
router.use("/status", status);

//const pool = require("../app");

router.get("/projects", (req, res) => {
    console.log(pool,"pool");
    pool.query('SELECT * FROM unica_projects ', function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results);
    }); 
});

module.exports = router;