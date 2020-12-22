const express = require("express");
const router = express.Router();

// Import the Sequelize models
const db = require("../models");

// ---------------------------------
//          Project Routes
// ----------------------------------
router.get("/api/tasks/:projectID?", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.redirect("/");        
    }
    if(req.params.taskID){
        db.Task.findAll({where: {ProjectId: req.params.projectID}}).then(taskData => {
             let resTasks = [];
              taskData.forEach(task => {
              resTasks.push(task.dataValues);
             });
             
            res.json(resTasks);
        }); 
    }
    else{
        db.Task.findAll({}).then(taskData => {
              let resTasks = [];
              taskData.forEach(task => {
              resTasks.push(task.dataValues);
             });
             
            res.json(resTasks);
        });       
    }
});

router.get("/tasks", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.redirect("/");       
    }
      else {
        db.Task.findAll({}).then(taskData => {
              //console.log(taskData);
              let resTasks = [];
              taskData.forEach(task => {
              resTasks.push(task.dataValues);
             });
             //console.log(resTasks);
            res.render("tasks", { tasks: resTasks });
        }); 
        }      
});

router.post("/api/tasks/:projectID", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});
    }else{
        db.Task.create({
            taskName: req.body.taskName,
            taskDesc: req.body.taskDesc,
            taskPriority: req.body.taskPriority,            
            projectId: parseInt(req.params.projectID)
          }).then(result => {
              res.json({ id: result.insertId });
          });
    }   
});

router.put("/api/tasks/:taskID", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});
    }else{
        db.Task.update({
            taskName: req.body.taskName,
            taskDesc: req.body.taskDesc,
            taskPriority:req.body.taskPriority,
            taskStatus:req.body.taskStatus
        }, {
            where: {
                id: req.params.taskID
            }
        }).then(taskData => {
            res.json(taskData);
        });
    }    
});

router.delete("/api/tasks/:taskID", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});
    }else{
        db.Task.destroy({
            where: {
                id: req.params.taskID
            }
        }).then(projectData => {
            res.json(projectData);
        });
    }    
});


// Export the router
module.exports = router;