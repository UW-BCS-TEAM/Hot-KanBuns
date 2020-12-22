const express = require("express");
const router = express.Router();

// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport.js");


// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
});

// Route for logging user out
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
      res.json({});
    }else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,

        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName
      });
    }
});

router.get("/api/users", function(req,res) {
  if (!req.user) {
    res.json({Error: "Unauthorized User"});
  } else {
    db.User.findAll({}).then(userData => {
      let resUsers = [];
              userData.forEach(user => {
              resUsers.push(user.dataValues);
             });
            res.json(resUsers);
        });
  }
});

router.get("/api/users/:taskID", function(req,res) {
  if (!req.user) {
    res.json({Error: "Unauthorized User"});
  }
  else {
    db.sequelize.query('select u.firstName, u.lastName, u.id from users u, assignedtasks at where u.id = at.UserId and TaskId = ?',
  { replacements: [parseInt(req.params.taskID)], type: db.sequelize.QueryTypes.SELECT }).then(userData => {
    console.log(userData);
            res.json(userData);
        });
  }
});



 
 

  
module.exports = router;
