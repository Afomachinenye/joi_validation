const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const User = require("./routes/user");

const db = require("./config/dbconfig");
const route = require("./routes/user");
const app = express();

/*MIDDLEWARE*/
app.use(express.json());
app.use(cookieParser()); //Helps you know a user's preference on your website
app.use(logger("dev")); //it helps to track user activities
app.use(express.urlencoded({ extended: false }));
app.use(route);

// Default route
app.get("/", (req, res) => {
  res.send("Hello, this is the default route!");
});

/*PORT*/
const PORT = process.env.PORT || 8086;

/*DB CONNECT*/
db();

/*CREAT SERVER*/
app.listen(PORT, () => console.log(`Server run on port: ${PORT}`));
