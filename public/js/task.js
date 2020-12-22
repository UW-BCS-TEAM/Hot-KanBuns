$(document).ready(()=>{
    let taskID = null;
    // Event Handler for delete button on dynamically created task cards
    $(".task-delete").on("click", () => {
        taskID = $(this)[0].document.activeElement.dataset.id;
        $.ajax({
            url: `/api/tasks/${taskID}`,
            method: "DELETE"
        }).then(() => {
            location.reload();
        });
    });

    $(".task-edit").on("click", () => {
        taskID = $(this)[0].document.activeElement.dataset.id;
        console.log(taskID);
    });
    
    // Event handler for "Add Task" button in the addTask modal
    $("#add-task-btn").on("click", () => {
        const newTask = {
            taskName: $("#addtaskname").val().trim(),
            taskDesc: $("#addtaskdesc").val().trim(),
            taskPriority: $("#addtaskpriority").val()
        };
        
        let projectID = $("#project-id").data("id");        

        $.post(`/api/tasks/${projectID}`, newTask).then(() => {
            location.reload();
        });
    });

    $("#update-task-btn").on("click", () => {
        const updatedTask = {
            taskName: $("#updatedtaskname").val().trim(),
            taskDesc: $("#updatedtaskdesc").val().trim(),
            taskStatus: $("#updatedtaskstatus").val(),
            taskPriority: $("#updatedtaskpriority").val()
        };

        $.ajax({
            url: `/api/tasks/${taskID}`,
            type: 'PUT',
            data: updatedTask
        }).then(() => {
            let url = location.toString();
            location.reload(url);
        });
        
    });

});

