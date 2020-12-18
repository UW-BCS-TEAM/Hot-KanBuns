const express = require("express");
const router = express.Router();
const app = express()
var exphbs = require("express-handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import the Sequelize models
const db = require("../models");

// ---------------------------------
//          Project Routes
// ----------------------------------
router.get("/api/projects/:userID?", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    }
    if (req.params.userID) {
        db.Project.findAll({ where: { userid: req.params.userID } }).then(projectData => {
            res.json(projectData);
        });
    }
    else {
        db.Project.findAll({}).then(projectData => {
            res.json(projectData);
        });
    }
});

router.post("/api/projects/:userID", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        db.Project.create({
            projectName: req.body.projectName,
            projectDesc: req.body.projectDesc,
            userId: parseInt(req.params.userID)
        }).then(result => {
            res.json({ id: result.insertId });
        });
    }
});

router.put("/api/projects/:projectID", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        db.Project.update({
            projectName: req.body.projectName,
            projectDesc: req.body.projectDesc
        }, {
            where: {
                id: req.params.projectID
            }
        }).then(projectData => {
            res.json(projectData);
        });
    }
});

router.delete("/api/projects/:projectID", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        db.Project.destroy({
            where: {
                id: req.params.projectID
            }
        }).then(projectData => {
            res.json(projectData);
        });
    }
});



app.get("/", function (req, res) {


    connection.query("SELECT * FROM projects;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        res.render('members', { projects: data })

    });

});

// app.get("/api/projects/:userID", function(req, res) {

//     connection.query("SELECT * FROM projects where UserId = ?", [req.params.id], function(err, data) {
//       if (err) {
//         return res.status(500).end();
//       }

//       console.log(data);
//       res.render('members', { projects: data })
//     });
//   });





// Export the router
module.exports = router;