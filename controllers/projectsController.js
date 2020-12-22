const express = require("express");
const router = express.Router();
// Import the Sequelize models
const db = require("../models");
// ---------------------------------
//          Project Routes
// ----------------------------------
router.get("/projects", (req, res) => {
    if(!req.user){
        res.redirect("/");
    }
    res.render("projects");
    
});

router.get("/projects/:projectID", (req, res) => {
    if(!req.user){
        res.redirect("/");
    }

    let projectInfo = {};
    
    db.Project.findAll({where: {id: req.params.projectID}}).then(projectData => {
        projectInfo = projectData[0].dataValues;  
        
        db.Task.findAll({where: {ProjectId: projectInfo.id}}).then(taskData => {
            let inProgressTasks = [];
            let todoTasks = [];
            let completedTasks = [];
           
             taskData.forEach(task => {
                 if(task.dataValues.taskStatus === "todo"){
                   todoTasks.push(task.dataValues);
                 }else if(task.dataValues.taskStatus === "completed"){
                   completedTasks.push(task.dataValues); 
                 }else{
                   inProgressTasks.push(task.dataValues);
                }
            });
   
           res.render("tasks", {info: projectInfo, inProgress: inProgressTasks, todos: todoTasks, done: completedTasks });
       });
    });

});






// API ROUTES
router.get("/api/projects/:userID?", (req, res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});        
    }
    if(req.params.userID){
        db.Project.findAll({where: {userid: req.params.userID}}).then(projectData => {
            let projectList = [];
            projectData.forEach(project => {
                projectList.push(project.dataValues);
            });
            res.json(projectList);
        }); 
    }
    else{
        db.Project.findAll({}).then(projectData => {
            let projectList = [];
            projectData.forEach(project => {
                projectList.push(project.dataValues);
            });
            res.json(projectList);
        });       
    }
});

router.get("/api/projectInfo/:projectID", (req,res) => {
    // Check for user authentication before making query
    if(!req.user){
        res.json({Error: "Unauthorized User"});        
    } else {
        db.Project.findAll({where: {id: req.params.projectID}}).then(projectData => {   
            let projects =[];
            projectData.forEach(project => {
                projects.push(project.dataValues);
            })         
            res.json(projects[0]);
        }); 
    }
});

router.post("/api/projects/:userID", (req, res) => {
    console.log(req.body);
    console.log(req.params);
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
                id: parseInt(req.params.projectID)
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
                id: parseInt(req.params.projectID)
            }
        }).then(projectData => {
            res.json(projectData);
        });
    }    
});
// Export the router
module.exports = router;