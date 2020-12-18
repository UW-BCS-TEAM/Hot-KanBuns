// $(document).ready(function() {
//     // This file just does a GET request to figure out which user is logged in
//     // and updates the HTML on the page
//     $.get("/api/user_data").then(function(data) {
//       $(".member-name").text(data.email);
//     });



//     });

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  let userId = null;

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    userId = data.id;
  });



  $.get("/api/projects").then(function (data) {
    console.log("data", data);
    for (i = 0; i < 2;) {
      const allProjectsEl = $("#all-projects");
      const listEl = $("<li>");



      listEl.text(data[i].projectName);

      allProjectsEl.append(listEl);

      i++
    }

  });



  $.get("/api/projects").then(function (data) {
    for (i = 0; i < 3;) {
      const myProjectsEl = $("#my-projects");
      const listEl = $("<li>");

      listEl.text(data[i].projectName);

      myProjectsEl.append(listEl);

      i++
    }
  });


  //New Project
  $("#create-btn").on("click", function (event) {
    event.preventDefault();



    const newProj = {
      projectName: $("#name").val().trim(),
      projectDesc: $("#desc").val().trim()
    };
    console.log("new project", newProj)

    $.post(`/api/projects/${userId}`, newProj).then(function() {
      console.log("created new project");

      // location.reload();
    }
    );
  });
});

