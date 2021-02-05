const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");
const mysql = require("mysql"); 

const app = express();
const api = require("./api");

app.use(express.json());
app.use(cors());

//Mysql
const pool = mysql.createPool({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "unicadb",
    connectionLimit : 10
});

//Register routes
app.get("/projects", (req, res) => {
    pool.query('SELECT * FROM projects ', function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results);
    }); 
});

module.exports = pool;

app.use("/api", api);

//Listen on port
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));