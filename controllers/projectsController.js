const express = require("express");
const router = express.Router();

// Import the Sequelize models
const db = require("../models");

// ---------------------------------
//          Project Routes
// ----------------------------------
router.get("/projects/:projectID", (req, res) => {
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        //res.render("project");
        // Need to know what page and data to render in handlebars
    }

});
router.get("/api/projects/:userID?", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    }
    if (req.params.userID) {
        db.Project.findAll({ where: { userid: req.params.userID } }).then(projectData => {
            let projectList = [];
            projectData.forEach(project => {
                projectList.push(project.dataValues);
            });
            res.json(projectList);
        });
    }
    else {
        db.Project.findAll({}).then(projectData => {
            let projectList = [];
            projectData.forEach(project => {
                projectList.push(project.dataValues);
            })
            res.render("members", { projects: projectList });
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
            UserId: parseInt(req.params.userID)
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


// Export the router
module.exports = router;