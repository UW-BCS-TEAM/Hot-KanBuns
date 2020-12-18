// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const exphbs = require("express-handlebars");
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");


// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Import routes from our controllers
const htmlRoutes = require("./controllers/routesController.js");
const userRoutes = require("./controllers/usersController.js");
const projectRoutes = require("./controllers/projectsController.js");
const taskRoutes = require("./controllers/tasksController.js");


// Assign routes to our server
app.use(htmlRoutes);
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

