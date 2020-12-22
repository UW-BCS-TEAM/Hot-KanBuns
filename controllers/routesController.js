// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/projects");
    }
    res.render("login");
    //res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/projects");
    }
    res.render("login");
    //res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/projects");
    }
    res.render("signup");
    //res.sendFile(path.join(__dirname, "../public/login.html"));
});

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/projects", isAuthenticated, function(req, res) {
//     res.render("projects");
//     //res.sendFile(path.join(__dirname, "../public/members.html"));
// });

// router.get("/tasks", isAuthenticated, function(req, res) {
//     res.render("tasks");
//     //res.sendFile(path.join(__dirname, "../public/members.html"));
// });

module.exports = router;
