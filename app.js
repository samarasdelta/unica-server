const SERVER_PORT = process.env.PORT || 4000;

const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./models/db.js");

const app = express();
const api = require("./api");

app.use(express.json());

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
  
//Register routes
  app.get("/api/projects", (req, res) => {
      pool.query('SELECT * FROM projects ', function (error, results) {
         if (error) throw error;
         console.log('The solution is: ', results);
         res.send(results); 
     }); 
  }); 

app.use("/api", api);

module.exports = pool;

//Listen on port
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));