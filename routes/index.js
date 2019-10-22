var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("register", { title: "Hola", action: "Register in" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Hola", action: "Login to" });
});

router.get("/public", (req, res) => {
  res.render("public");
});

router.post("/register", (req, res, next) => {
  User.create({ email: req.body.email, password: req.body.password }).then(() =>
    res.redirect("/login")
  );
});
router.get("/private", (req, res) => {
  console.log("hola");
  res.render("private", { title: "hla", action: "adsda" });
});
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  // console.log("USER", req.user);
  res.redirect("/private");
});

module.exports = router;
