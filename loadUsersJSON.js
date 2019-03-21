// Set up a dummy function so we don't pollute the global namespace
(function () {
  "use strict";

  var insertUsers = function(users) {

    var list = document.getElementById("userList");
    list.getElementsByClassName("noneMarker")[0].hidden = true;
    users.forEach(function(user){
      var newLI = document.createElement("li");
      var newText = document.createTextNode(user.lname + ", " + user.fname + ": " + user.email);
      newLI.appendChild(newText);
      list.appendChild(newLI);
    });
  };

  var loadUsers = function () {
    var ajax = new XMLHttpRequest();
    console.log("Click!");

    // Replace URL below with the URL for your server.
    ajax.open("GET", 'http://localhost:3000/users.json');
    ajax.onreadystatechange = function () {
      console.log("Ajax state: " + ajax.readyState);
      if (ajax.readyState === 4 && ajax.status === 200) {
        console.log("Complete AJAX object:");
        console.log(ajax);
        var users = JSON.parse(ajax.responseText);
        console.log("Parsed JSON");
        console.log(users);
        insertUsers(users);
      } else if (ajax.readyState === 4 && ajax.status !== 200) {
        console.log("There was a problem.  Status returned was " + ajax.status);
      }
    };

    ajax.onerror = function () {
      console.log("There was an error!");
    };

    // Notice that send is asynchronous.  This method does not block,
    // instead, the code in onreadystatechange above runs when the call
    // is complete.
    ajax.send();
  };

// Don't apply the event listeners until the document has loaded.
  document.addEventListener("readystatechange", function () {
    console.log("Ready:  " + document.readyState);
    if (document.readyState === "interactive") {
      var loadButton = document.getElementById("loadButton");
      loadButton.addEventListener("click", loadUsers);
    }
  });
})();