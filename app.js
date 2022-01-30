const express = require("express");
const app = express();
const port = 3003;
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");

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

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false,
  })
);

// Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");

// Api routes

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  // console.log(req.session.user.username);
  var payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };
  res.status(200).render("home", payload);
});
