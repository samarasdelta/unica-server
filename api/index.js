const express = require("express");
const router = express.Router();

//Status check
const status = require("./status");
router.use("/status", status);

//Register routes
router.get("/projects", (req, res) => {
    pool.query('SELECT * FROM projects ', function (error, results) {
       if (error) throw error;
       console.log('The solution is: ', results);
       res.send(results); 
   }); 
});

module.exports = router;