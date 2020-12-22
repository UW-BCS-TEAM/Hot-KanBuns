let url = window.location.href;
let pos = url.lastIndexOf("/");
let projectId = url.slice(pos + 1);

$(document).ready(() => {

    $.get(`/api/projectInfo/${projectId}`,function (data){
        console.log(data[0].projectName);
        console.log(data[0].projectDesc);
        $("#project-name").html(`<h1>${data[0].projectName}</h1>`);
        $("#project-description").html(`<p>${data[0].projectDesc}</p>`);
    })

    let inHTML = "";
    $.get("/api/users", function (data) {
        $.each(data, function (i, ob) {
            inHTML += '<option value="' + ob.id + '">' + ob.firstName + ' ' + ob.lastName + '</option>';
        });
        $("#updated-users-select-from").empty().append(inHTML);
        $("#new-users-select-from").empty().append(inHTML);
    });
});

$('#btn-add-update').click(function () {
    $('#updated-users-select-from option:selected').each(function () {
        $('#updated-users-select-to').append("<option value='" + $(this).val() + "'>" + $(this).text() + "</option>");
        $(this).remove();
    });
});

$(".task-delete").on("click", function () {
    let taskID = $(this).data("id");

    $.ajax({
        url: `/api/tasks/${taskID}`,
        method: "DELETE"
    }).then(() => {
        console.log("Task Deleted!");
        location.reload();
    });

});

$('#btn-remove-update').click(function () {
    $('#updated-users-select-to option:selected').each(function () {
        $('#updated-users-select-from').append("<option value='" + $(this).val() + "'>" + $(this).text() + "</option>");
        $(this).remove();
    });
});

$('#btn-add-new').click(function () {
    $('#new-users-select-from option:selected').each(function () {
        $('#new-users-select-to').append("<option value='" + $(this).val() + "'>" + $(this).text() + "</option>");
        $(this).remove();
    });
});

$('#btn-remove-new').click(function () {
    $('#new-users-select-to option:selected').each(function () {
        $('#new-users-select-from').append("<option value='" + $(this).val() + "'>" + $(this).text() + "</option>");
        $(this).remove();
    });
});

$("#task-add").on("click", function () {

    const newTask = {
        taskname: $("#newtaskname").val().trim(),
        taskdesc: $("#newtaskdesc").val().trim(),
        taskpriority: $("#newtaskpriority").val().trim(),
        taskstatus: $("#newtaskstatus").val().trim()
    };

    $("#task-add").attr('data-dismiss', 'modal');

    $.post(`/api/tasks/${projectId}`, newTask).then(function (res) {
        console.log("created new task");
        console.log(res);
        let selectedtaskID = res.id;
        let selectedUsers = $.map($('#new-users-select-to option') ,function(option) {
            return option.value;
           });

        const newtaskusers = {selectedUsers:selectedUsers};
        $.ajax({
            url: `/api/taskUsers/${selectedtaskID}`,
            type: 'put',
            data: newtaskusers
          }).then(function (res1) {
            location.reload();
          });
       });
});

$(".task-edit").on("click", function () {
    let taskID = $(this).data("id");
    $.get(`/api/taskInfo/${taskID}`, function (data) {
        $("#updatedtaskid").text(data[0].id);
        $("#updatedtaskname").val(data[0].taskName);
        $("#updatedtaskdesc").val(data[0].taskDesc);
        $("#updatedtaskstatus").val(data[0].taskStatus);
        $("#updatedtaskpriority").val(data[0].taskPriority);

        let inHTML = "";
        $.get(`/api/users/${taskID}`, function (data) {
            $.each(data, function (i, ob) {
                inHTML += '<option value="' + ob.id + '">' + ob.firstName + ' ' + ob.lastName + '</option>';
            });
            $("#updated-users-select-to").empty().append(inHTML);

            $('#updated-users-select-to option').each(function () {
                let users_val = $(this).val();
                $('#updated-users-select-from option').each(function () {
                    if ($(this).val() === users_val)
                     $(this).remove();
                });  
            });
            $('#updateTask').modal('show');
        });
    });
});

$("#task-update").on("click", function () {

    let selectedtaskID = $("#updatedtaskid").text();

    const updatedTask = {
        taskname: $("#updatedtaskname").val().trim(),
        taskdesc: $("#updatedtaskdesc").val().trim(),
        taskpriority: $("#updatedtaskpriority").val().trim(),
        taskstatus: $("#updatedtaskstatus").val().trim()
    };

    $("#task-update").attr('data-dismiss', 'modal');

    $.ajax({
        url: `/api/tasks/${selectedtaskID}`,
        type: 'put',
        data: updatedTask
      }).then(function (res) {

        let selectedUsers = $.map($('#updated-users-select-to option') ,function(option) {
            return option.value;
           });

        console.log(selectedUsers);
        const updatedtaskusers = {selectedUsers:selectedUsers};
        $.ajax({
            url: `/api/taskUsers/${selectedtaskID}`,
            type: 'put',
            data: updatedtaskusers
          }).then(function (res1) {
            console.log(res1);
            location.reload();
          });
      });
});

