
var userId = null;
$(document).ready(function () {


  let user_fName = null;
  let user_lName = null;

  $.get("/api/user_data").then(function (data) {
    userId = data.id;
    user_fName = data.firstName;
    user_lName = data.lastName;
    $(".member-name").text(user_fName + ' ' + user_lName);


    $.get(`/api/projects/${userId}`).then(function (data) {
      console.log(data);
      const myProjectsEl = $("#my-projects");
      data.forEach(projects => {
        myProjectsEl.append(`<li><a href=/api/tasks/${projects.id}>${projects.projectName}</a></li>`);
        $("#myprojectsselect").append('<option value="' + projects.id + '">' + projects.projectName + '</option>');
        $("#projecttodelete").append('<option value="' + projects.id + '">' + projects.projectName + '</option>');
      });

    });

    $.get("/api/projects").then(function (data) {
      const allProjectsEl = $("#all-projects");
      data.forEach(projects => {
        allProjectsEl.append(`<li><a href=/api/tasks/${projects.id}>${projects.projectName}</a></li>`);
      });
    });
  });
});

//New Project
$("#create-btn").on("click", function (event) {
  event.preventDefault();
  if (projectname.value === "") {
    $("#validation_projname").html('<p style="color:red">Project name is required</p>');
  } else if (projectdesc.value === '') {
    $("#validation_projname").html('');
    $("#validation_projdesc").html('<p style="color:red">Project Desciption is required</p>');
  } else {
    $("#validation_projname").html('');
    $("#validation_projdesc").html('');
    const newProj = {
      projectName: $("#projectname").val().trim(),
      projectDesc: $("#projectdesc").val().trim()
    };

    $("#create-btn").attr('data-dismiss','modal');

    $.post(`/api/projects/${userId}`, newProj).then(function () {
      console.log("created new project");
      location.reload();
    });
  }
});

$("#myprojectsselect").on("change", function () {

  console.log(this.value);
  $.get(`/api/projectInfo/${this.value}`).then(function (data) {
    console.log(data);
    console.log(data[0].projectName);
    console.log(data[0].projectDesc);
    $("#curprojectname").val(data[0].projectName);
    $("#curprojectdesc").val(data[0].projectDesc);
  });
});

$("#update-btn").on("click", function (event) {
  event.preventDefault();
  let selectedprojID = $("#myprojectsselect").val();

  const updatedProj = {
    projectName: $("#curprojectname").val().trim(),
    projectDesc: $("#curprojectdesc").val().trim()
  };
  console.log("new project", updatedProj)
  console.log(`/api/projects/${selectedprojID}`);

  $.ajax({
    url: `/api/projects/${selectedprojID}`,
    type: 'put',
    data: updatedProj
  }).then(function (res) {
    console.log(res);
    location.reload();
  });
});

$("#delete-btn").on("click", function (event) {
  event.preventDefault();
  let selectedprojID = $("#projecttodelete").val();

  console.log(`/api/projects/${selectedprojID}`);

  $.ajax({
    url: `/api/projects/${selectedprojID}`,
    type: 'delete',
  }).then(function (res) {
    console.log(res);
    location.reload();
  });
});


