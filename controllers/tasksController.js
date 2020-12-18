const express = require("express");
const router = express.Router();

// Import the Sequelize models
const db = require("../models");

// ---------------------------------
//          Project Routes
// ----------------------------------
router.get("/api/tasks/:taskID?", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});        
    }
    if(req.params.taskID){
        db.Task.findAll({where: {id: req.params.taskID}}).then(taskData => {
             let resTasks = [];
              taskData.forEach(task => {
              resTasks.push(task.dataValues);
             });
             //console.log(resTasks);
            res.render("tasks", { tasks: resTasks });
        }); 
    }
    else{
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

router.get("/tasks", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.render("login");       
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

// router.get("/api/tasks/getusers/:taskID?", (req, res) => {
//     // Check for user authentication before making query
//     if(!req.user){
//         res.json({Error: "Unauthorized User"});        
//     }
//     if(req.params.taskID){
//         db.Task.findAll({where: {id: req.params.taskID}}).then(taskData => {
//              let resTasks = [];
//               taskData.forEach(task => {
//               resTasks.push(task.dataValues);
//              });
//              console.log(resTasks);
//             res.render("tasks", { tasks: resTasks });
//         }); 
//     }
// });

router.post("/api/tasks/:projectID", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});
    }else{
        db.Task.create({
            taskName: req.body.taskname,
            taskDesc: req.body.taskdesc,
            taskPriority: req.body.taskpriority,
            taskStatus: req.body.taskstatus,
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
            taskName: req.body.taskname,
            taskDesc: req.body.taskdesc,
            taskPriority:req.body.taskpriority,
            taskstatus:req.body.taskStatus
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