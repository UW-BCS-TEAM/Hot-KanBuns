$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    
    $.get("/api/user_data").then(function(data) { 
      let projectList = $(".project-list");
      let projectForm = $(".project-form");
      let projectName = $("input#projectName");
      let projectDescription = $("input#projectDescription");
      let projects = [];
      $(".member-name").text(data.email);
      
      getProjects(data.id);
      
      
  
      // When the signup button is clicked, we validate the email and password are not blank
      projectForm.on("submit", function(event) {
        event.preventDefault();
        let projectData = {
          name: projectName.val().trim(),
          description: projectDescription.val().trim()       
        };  

        if (!projectData.name || !projectData.description) {
          return;
        }
        // If we have an email and password, run the signUpUser function
        createProject(projectData);
        projectName.val("");
        projectDescription.val("");
      });    
      
      function createProject(projectData) {
        $.post(`/api/projects/${data.id}`, {
          projectName: projectData.name,
          projectDesc: projectData.description
        }).then(function(data) {
            window.location.replace("/members");
            // If there's an error, handle it by throwing up a bootstrap alert
          });
      }

      function getProjects(userId){
        $.get(`/api/projects/${userId}`).then(projectData => {
          projectData.forEach(project => {
            let row = $("<div>");
            row.addClass("project");
            row.append(`<a href="/projects/${project.id}"><h3>${project.projectName}</h3</a>`);
            row.append("<p>" + project.projectDesc + "</p>");
            projectList.append(row);
          });
          
        });
      }

    });     
});
