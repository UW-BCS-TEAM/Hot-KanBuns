const express = require("express");
const router = express.Router();

// Import the Sequelize models
const db = require("../models");

// ---------------------------------
//          Task Routes
// ----------------------------------
router.get("/tasks/:projectID?", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    }
    if (req.params.projectID) {
        db.Task.findAll({ where: { ProjectId: req.params.projectID } }).then(taskData => {
            let inProgressTasks = [];
            let todoTasks = [];
            let completedTasks = [];
            taskData.forEach(task => {
                if (task.dataValues.taskStatus === "TO DO") {
                    todoTasks.push(task.dataValues);
                } else if (task.dataValues.taskStatus === "DONE") {
                    completedTasks.push(task.dataValues);
                } else {
                    inProgressTasks.push(task.dataValues);
                }
            });
            //console.log(resTasks);
            res.render("tasks", { inProgress: inProgressTasks, todos: todoTasks, done: completedTasks });
        });
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

router.get("/api/taskInfo/:taskID", (req, res) => {
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        db.Task.findAll({ where: { id: req.params.taskID } }).then(taskData => {
            let resTasks = [];

            taskData.forEach(task => {
                resTasks.push(task.dataValues);
            });
            //console.log(resTasks);
            res.json(resTasks);
        });
    }
})
router.get("/tasks", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.render("login");
    }
    else {
        db.Task.findAll({}).then(taskData => {
            //console.log(taskData);
            let resTasks = [];
            taskData.forEach(task => {
                if (task.dataValues.taskPriority === "todo") {

                }
                resTasks.push(task.dataValues);
            });
            //console.log(resTasks);
            res.render("newTasks", { todos: resTasks });
        });
    }
});

router.post("/api/tasks/:projectID", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        db.sequelize.query(`insert into Tasks (taskName,taskDesc,taskStatus,taskPriority,createdAt,updatedAt,projectId) values ("${req.body.taskname}","${req.body.taskdesc}","${req.body.taskstatus}","${req.body.taskpriority}",current_date(),current_date(),${parseInt(req.params.projectID)});`).then(([results, metadata]) => {
            res.json({ id: results });
        });
    }
});

router.put("/api/taskUsers/:taskID", (req, res) => {
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        db.sequelize.query(`delete from assignedTasks where TaskId = ${req.params.taskID} `).then(([results, metadata]) => {
            if (req.body.selectedUsers) {
                req.body.selectedUsers.forEach(userid => {
                    db.sequelize.query(`insert into assignedTasks (TaskId,UserId,createdAt,updatedAt) values(${req.params.taskID},${userid},CURRENT_DATE(),CURRENT_DATE())`).then(([results, metadata]) => {
                        res.status(200).end();
                    })
                })
            }
        });
    }
});

router.put("/api/tasks/:taskID", (req, res) => {
    // Check for user authentication before making query
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        db.Task.update({
            taskName: req.body.taskname,
            taskDesc: req.body.taskdesc,
            taskPriority: req.body.taskpriority,
            taskStatus: req.body.taskstatus
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
    if (!req.user) {
        res.json({ Error: "Unauthorized User" });
    } else {
        db.Task.destroy({
            where: {
                id: req.params.taskID
            }
        }).then(projectData => {
            res.status(200).end();
        });
    }
});


// Export the router
module.exports = router;