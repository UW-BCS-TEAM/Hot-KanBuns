
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
        description:taskDesc.val().trim(),
        level: taskPriority.val().trim(),
        progress:  taskStatus.val().trim()
    }


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


$(function () {
    var str = "",
        inHTML = ""
    $.get("/api/users",function(data) {
      //console.log(data);
       $.each(data, function (i, ob) {
        inHTML += '<option value="' + ob.id + '">' + ob.firstName + ' ' + ob.lastName + '</option>';
    });
    $("#AllUsers").empty().append(inHTML);
    });
   $.get("/api/users/2", function(data1) {
     inHTML = "";
     $.each(data1, function (i, ob) {
        inHTML += '<option value="' + ob.id + '">' + ob.firstName + ' ' + ob.lastName + '</option>';
    });
    $("#TaskUsers").empty().append(inHTML);
   });
$('#add').click(function () {
    inHTML = "";

    $("#AllUsers option:selected").each(function () {
        if ($("#TaskUsers option[value=" + $(this).val() + "]").length == 0) {
            inHTML += '<option value="' + $(this).val() + '">' + $(this).text() + '</option>';
        }
    });
    $("#TaskUsers").append(inHTML);
});
$('#remove').click(function () {
    $('#TaskUsers option:selected').remove();
});
});

