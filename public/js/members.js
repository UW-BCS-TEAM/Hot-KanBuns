$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
    });


    app.get("/", function(req, res) {
      connection.query("SELECT * FROM projects;", function(err, data) {
        if (err) {
          throw err;
        }

        // Test it.
        // console.log('The solution is: ', data);

        // Test it.
        // res.send(data);

        res.render("members", { projects: data });
      });
    });




  });
