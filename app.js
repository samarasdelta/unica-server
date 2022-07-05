const SERVER_PORT = process.env.PORT || 4000;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const api = require("./api");
const auth = require("./auth/routes");

require("./auth/passport");

app.use(express.json());
app.use(cors());

// parse requests of content-type: application/json or application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);
app.use("/auth", auth);

// Listen on port
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
