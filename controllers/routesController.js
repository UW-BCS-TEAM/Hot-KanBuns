// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function(req, res) {
    // If the user already has an account send them to the projects page
    if (req.user) {
      res.redirect("/projects");
    }


    res.render("login");
    //res.sendFile(path.join(__dirname, "../public/signup.html"));

});

router.get("/login", function(req, res) {
    // If the user already has an account send them to the projects page
    if (req.user) {
      res.redirect("/projects");
    }
    res.render("login");
});

router.get("/signup", function(req, res) {
    // If the user already has an account send them to the projects page
    if (req.user) {
      res.redirect("/projects");
    }
    res.render("signup");
    //res.sendFile(path.join(__dirname, "../public/login.html"));
});


router.get("/projects", isAuthenticated, function(req, res) {
    res.render("projects");
});

// router.get("/tasks", isAuthenticated, function(req, res) {
//     res.render("tasks");
//     //res.sendFile(path.join(__dirname, "../public/projects.html"));
// });

module.exports = router;
