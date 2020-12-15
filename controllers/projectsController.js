const express = require("express");
const router = express.Router();

// Import the Sequelize models
const db = require("../models");

// ---------------------------------
//          Project Routes
// ----------------------------------
router.get("/api/projects/:userID?", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});        
    }else{
        db.Project.findAll({where: {userid: req.params.userID}}).then(projectData => {
            res.json(projectData);
        });       
    }
});

router.post("/api/projects/:userID", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});
    }else{
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
    if(!req.user){
        res.json({Error: "Unauthorized User"});
    }else{
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
    if(!req.user){
        res.json({Error: "Unauthorized User"});
    }else{
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