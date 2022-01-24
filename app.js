const express = require("express");
const app = express();
const port = 3003;
const middleware = require("./middleware");
// const path = require("path");
// const bodyParser = require("body-parser");
// const session = require("express-session");

// Database Connection
const mongoose = require("./database");

/*
Start server
This call back function will be called as soon as the server starts listening
*/
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.set("view engine", "pug"); // Tell the server which template engine that we gonna use
app.set("views", "views"); // Tell the server where to get the pug file

app.get("/", (req, res, next) => {
  var payload = {
    pageTitle: "Home",
  };
  res.status(200).render("home", payload);
});
