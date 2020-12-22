let url = window.location.href;
let pos = url.lastIndexOf("/");
let projectId = url.slice(pos + 1);

$(document).ready(() => {

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

    let inHTML = "";
    $.get("/api/users", function (data) {
        console.log(data);
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

    $.post(`/api/tasks/${projectId}`, newTask).then(function () {
        console.log("created new task");
        location.reload();
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
            console.log(data);
            $.each(data, function (i, ob) {
                inHTML += '<option value="' + ob.id + '">' + ob.firstName + ' ' + ob.lastName + '</option>';
            });
            $("#updated-users-select-to").empty().append(inHTML);
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

    $('#new-users-select-to option:selected').each(function () {
        console.log($(this).val());
    });

    console.log(selectedtaskID);
    console.log(updatedTask);

    $("#task-update").attr('data-dismiss', 'modal');

    $.ajax({
        url: `/api/tasks/${selectedtaskID}`,
        type: 'put',
        data: updatedTask
      }).then(function (res) {
        console.log(res);
        //location.reload();
      });
});

