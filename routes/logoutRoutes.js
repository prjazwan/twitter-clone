const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../schemas/UserSchema");

router.get("/", (req, res, next) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
});

module.exports = router;
