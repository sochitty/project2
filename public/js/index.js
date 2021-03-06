// Get references to page elements
/* global $ */

var $enter = $("#enter");

// The API object contains methods for each kind of request we'll make
var API = {
  authenticateUser: function(username, password) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/auth",
      data: JSON.stringify({
        username: username,
        password: password
      })
    });
  },

  createUser: function(newUser) {
    return $.ajax({
      headers: {
        "Content-type": "application/json"
      },
      type: "POST",
      url: "/api/users",
      data: JSON.stringify(newUser)
    });
  },

  createAccount: function(newAccount) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      type: "POST",
      url: "/api/accounts",
      data: JSON.stringify(newAccount)
    });
  },
  getAccounts: function() {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/accounts",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  deleteAccount: function(id) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/accounts/" + id,
      type: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  createGoal: function(newGoal) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      type: "POST",
      url: "/api/goals",
      data: JSON.stringify(newGoal)
    });
  },
  getGoals: function(accountID) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/accounts/" + accountID + "/goals",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  deleteGoal: function(id) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/goals/" + id,
      type: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  createStrategy: function(newStrat) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      type: "POST",
      url: "/api/strategies",
      data: JSON.stringify(newStrat)
    });
  },
  getStrategies: function(goalID) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/goals/" + goalID + "/strategies",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  deleteStrategy: function(id) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/strategy/" + id,
      type: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  createTactic: function(newTactic) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      type: "POST",
      url: "/api/tactics",
      data: JSON.stringify(newTactic)
    });
  },
  getTactics: function(stratID) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/strategy/" + stratID + "/tactics",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },
  deleteTactic: function(id) {
    var token = document.cookie
      .split(";")
      .filter(function(element) {
        return element.indexOf("token=") === 0;
      })[0]
      .split("=")[1];
    return $.ajax({
      url: "/api/tactic/" + id,
      type: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  }
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var usernameAuth = $("#estUsername").val();
  var passwordAuth = $("#estPassword").val();

  API.authenticateUser(usernameAuth, passwordAuth).then(function(token) {
    document.cookie = "token=" + token.token;
    location.reload();
  });
};
$("#enter").on("click", handleFormSubmit);

var createNewUser = function() {
  var newUser = {
    firstname: $("#firstName").val(),
    lastname: $("#lastName").val(),
    email: $("#email").val(),
    username: $("#username").val(),
    password: $("#password").val()
  };
  console.log(newUser);

  API.createUser(newUser).then(function() {
    console.log("user created");
  });
};
$("#save").on("click", createNewUser);

//Account creation
var handleAddAccountBtn = function() {
  var accountToAdd = {
    name: $("#inputName").val()
  };
  API.createAccount(accountToAdd).then(function() {
    location.reload();
    console.log(accountToAdd + " added");
  });
};

// Add event listeners to the submit and delete buttons
$("#accountAdd").on("click", handleAddAccountBtn);

//Goal creation
var handleAddGoalBtn = function() {
  var goalToAdd = {
    goal: $("#inputGoal").val(),
    owner: $("#inputOwner").val(),
    source: $("#inputSource").val(),
    uid: getParent()
  };
  API.createGoal(goalToAdd).then(function() {
    location.reload();
    console.log(goalToAdd + " added");
  });
};

$("#goalAdd").on("click", handleAddGoalBtn);

//Strategy creation
var handleAddStrategyBtn = function() {
  var strategyToAdd = {
    strategy: $("#inputStrategy").val(),
    owner: $("#inputOwner").val(),
    source: $("#inputSource").val(),
    uid: getParent()
  };
  API.createStrategy(strategyToAdd).then(function() {
    location.reload();
    console.log(strategyToAdd + " added");
  });
};

$("#strategyAdd").on("click", handleAddStrategyBtn);

//Tactic creation
var handleAddTacticBtn = function() {
  var tacticToAdd = {
    tactic: $("#inputTactic").val(),
    owner: $("#inputOwner").val(),
    source: $("#inputSource").val(),
    uid: getParent()
  };
  API.createTactic(tacticToAdd).then(function() {
    location.reload();
    console.log(tacticToAdd + " added");
  });
};

$("#tacticAdd").on("click", handleAddTacticBtn);

//Account deletion
var handleDeleteAccount = function() {
  var idToDelete = $(this).attr("data-id");

  API.deleteAccount(idToDelete).then(function() {
    location.reload();
  });
};
$(".account-delete").on("click", handleDeleteAccount);

//Goal deletion
var handleDeleteGoal = function() {
  var idToDelete = $(this).attr("data-id");

  API.deleteGoal(idToDelete).then(function() {
    location.reload();
  });
};
$(".goal-delete").on("click", handleDeleteGoal);

//Strategy deletion
var handleDeleteStrategy = function() {
  var idToDelete = $(this).attr("data-id");

  API.deleteStrategy(idToDelete).then(function() {
    location.reload();
  });
};
$(".strategy-delete").on("click", handleDeleteStrategy);

//Tactic deletion
var handleDeleteTactic = function() {
  var idToDelete = $(this).attr("data-id");

  API.deleteTactic(idToDelete).then(function() {
    location.reload();
  });
};
$(".tactic-delete").on("click", handleDeleteTactic);

console.log(
  "CONNECTED_________________________________________________________"
);

//function for parsing url into variables
function getParent() {
  var url = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi);
  var parts = url.split("/");
  return parts[4];
}
