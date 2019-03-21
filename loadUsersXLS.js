// Set up a dummy function so we don't pollute the global namespace
(function () {
  "use strict";

  var insertUsers = function(users) {
    var list = document.getElementById("userList");

    // Copy HTML returned by XSLT directly into DOM.
    list.innerHTML = users.getElementById("rootOfList").innerHTML;
  };


  var loadUsers = function () {
    var ajax = new XMLHttpRequest();
    console.log("Click!");

    // Replace URL below with the URL for your server.
    ajax.open("GET", 'https://buggerrreporter.herokuapp.com/users.xml');
    ajax.onreadystatechange = function () {
      console.log("Ajax state: " + ajax.readyState);
      if (ajax.readyState === 4 && ajax.status === 200) {
        console.log("Complete AJAX object:");
        console.log(ajax);

        insertUsers(ajax.responseXML);
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