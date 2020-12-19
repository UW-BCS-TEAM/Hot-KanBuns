$(document).ready(function () {


  let userId = null;

  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $(".member-name").text(data.email);

    userId = data.id;

    $.get(`/api/projects/${userId}`, function (data) {
      console.log("data", data[0].projectName);

      // if (data.projectName !== 0) {

      //   for (var i = 0; i < data.projectName; i++) {



      //     var listEl = $("<li>");


      //     listEl.text(data[i].projectName);

      //     $("#my-projects").append(listEl);

      //   }

      // }


    });
  });




  // function getAllProjects() {
  //   $.get(`/api/projects/${userId}`, function(data) {
  //     console.log("projects", data.projectName);
  //   //   var rowsToAdd = [];
  //   //   for (var i = 0; i < projectName.length; i++) {
  //   //     rowsToAdd.push(createAuthorRow(data[i]));
  //   //   }
  //   //   renderAuthorList(rowsToAdd);
  //   //   $("#all-projects").val("");
  //   // });
  // });


  //New Project
  $("#create-btn").on("click", function (event) {
    event.preventDefault();



    const newProj = {
      projectName: $("#name").val().trim(),
      projectDesc: $("#desc").val().trim()
    };
    console.log("new project", newProj)

    $.post(`/api/projects/${userId}`, newProj).then(function () {
      console.log("created new project");

      location.reload();
    }
    );
  });

});