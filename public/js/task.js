$(document).ready(function() {
    var formtask = $("form.create-form")
    var taskName= $("input#taskname");
    var taskDesc = $("input#taskdesc");
    var taskPriority = $("input.prioritylevel");
    var taskStatus = $("input.priorityprogress");

formtask.on("submit", function(event){
    event.preventDefault();
    var taskData = {
        name: taskName.val().trim(),
        description:taskDescr.val().trim(),
        level: taskPriority.val().trim(),
        progress:  taskStatus.val().trim()
    }


// taskUser(taskData.name, taskData.description, taskData.level, taskData.progress);
// taskName.val("");
// taskDesc.val("");
// taskPriority.val("");
// taskStatus.val("");
   
   // Send the POST request.
   $.ajax("/api/tasks/1", {
    type: "POST",
    data: taskData
  }).then(
    function() {
      console.log("created new Task");
      // Reload the page to get the updated list
      location.reload();
    }
  );



    })
})

