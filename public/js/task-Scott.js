$(document).ready(()=>{    
    $(".task-delete").on("click", function(){        
        let taskID = $(this).data("id");
        
        $.ajax({
            url: `/api/tasks/${taskID}`,
            method: "DELETE"
        }).then(() => {
            console.log("Task Deleted!");
            location.reload();
        });

    });
});

