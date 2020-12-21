$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    let userID = null;

    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
      userID = data.id;

      $.get(`/api/projects/${userID}`, function(projectData){
        let myProjects = $("#my-projects");
        projectData.forEach(project => {
          myProjects.append(`<li><a href="/api/tasks/${project.id}">${project.projectName}</a></li>`);
        });
      });

      $.get(`/api/projects/`, function(projectData){
        let teamProjects = $("#team-projects");
        projectData.forEach(project => {
          teamProjects.append(`<li><a href="/api/tasks/${project.id}">${project.projectName}</a></li>`);
        });
      });

    });

  });


  //Update name and description of project


  //Delete project
  $("#delete-btn").on("click", function (event) {
    event.preventDefault(); {

      $.ajax({
        method: "DELETE",
        url: `/api/projects/${projectId}`
      })
        .then(function () {
          location.reload();
        });
    }
  });